document.addEventListener('DOMContentLoaded', () => {
  const groupsContainer = document.getElementById('groups-container');
  const bracketContainer = document.getElementById('bracket-container');
  const resetBtn = document.getElementById('resetBtn');

  // State management
  let state = JSON.parse(localStorage.getItem('wc2026_state')) || {
    matches: {}, // key: "group_A_m0", value: { home: 1, away: 0 }
    knockout: {} // key: "r32_m0", value: { home: 2, away: 1 }
  };

  function saveState() {
    localStorage.setItem('wc2026_state', JSON.stringify(state));
  }

  resetBtn.addEventListener('click', () => {
    if(confirm('Are you sure you want to reset all data?')) {
      state = { matches: {}, knockout: {} };
      saveState();
      renderAll();
    }
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.stage-section').forEach(s => s.classList.remove('active'));
      e.target.classList.add('active');
      document.getElementById(e.target.dataset.target).classList.add('active');
    });
  });

  function calculateStandings(groupLetter) {
    const teams = worldCupData.groups[groupLetter];
    let standings = teams.map(team => ({
      name: team, pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0
    }));

    worldCupData.groupMatches.forEach((match, index) => {
      const matchKey = `group_${groupLetter}_m${index}`;
      const score = state.matches[matchKey];
      if (score && score.home !== '' && score.away !== '') {
        const homeIdx = match[0];
        const awayIdx = match[1];
        const homeGoals = parseInt(score.home);
        const awayGoals = parseInt(score.away);

        standings[homeIdx].pld++;
        standings[awayIdx].pld++;
        standings[homeIdx].gf += homeGoals;
        standings[homeIdx].ga += awayGoals;
        standings[awayIdx].gf += awayGoals;
        standings[awayIdx].ga += homeGoals;

        if (homeGoals > awayGoals) {
          standings[homeIdx].pts += 3;
          standings[homeIdx].w++;
          standings[awayIdx].l++;
        } else if (homeGoals < awayGoals) {
          standings[awayIdx].pts += 3;
          standings[awayIdx].w++;
          standings[homeIdx].l++;
        } else {
          standings[homeIdx].pts += 1;
          standings[awayIdx].pts += 1;
          standings[homeIdx].d++;
          standings[awayIdx].d++;
        }
      }
    });

    standings.forEach(s => s.gd = s.gf - s.ga);

    // Sort by points, then gd, then gf
    standings.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });

    return standings;
  }

  function renderGroupStage() {
    groupsContainer.innerHTML = '';
    
    Object.keys(worldCupData.groups).forEach(groupLetter => {
      const standings = calculateStandings(groupLetter);
      const teams = worldCupData.groups[groupLetter];
      
      const groupCard = document.createElement('div');
      groupCard.className = 'glass-panel group-card';
      
      // Standings HTML
      let standingsHTML = `
        <table class="standings-table">
          <thead>
            <tr>
              <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      standings.forEach((s, idx) => {
        let rowClass = '';
        if (idx < 2) rowClass = 'advances';
        else if (idx === 2) rowClass = 'maybe-advances';
        
        standingsHTML += `
          <tr class="${rowClass}">
            <td class="team-name">${s.name}</td>
            <td>${s.pld}</td><td>${s.w}</td><td>${s.d}</td><td>${s.l}</td><td>${s.gd}</td><td>${s.pts}</td>
          </tr>
        `;
      });
      standingsHTML += `</tbody></table>`;

      // Matches HTML
      let matchesHTML = `<div class="matches-list">`;
      worldCupData.groupMatches.forEach((match, index) => {
        const matchKey = `group_${groupLetter}_m${index}`;
        const score = state.matches[matchKey] || { home: '', away: '' };
        const homeTeam = teams[match[0]];
        const awayTeam = teams[match[1]];
        
        matchesHTML += `
          <div class="match-row">
            <span class="team">${homeTeam}</span>
            <div class="score-inputs">
              <input type="number" min="0" class="score-input" data-key="${matchKey}" data-side="home" value="${score.home}">
              <span>-</span>
              <input type="number" min="0" class="score-input" data-key="${matchKey}" data-side="away" value="${score.away}">
            </div>
            <span class="team">${awayTeam}</span>
          </div>
        `;
      });
      matchesHTML += `</div>`;

      groupCard.innerHTML = `
        <div class="group-header">Group ${groupLetter}</div>
        <div class="group-content">
          ${standingsHTML}
          ${matchesHTML}
        </div>
      `;
      groupsContainer.appendChild(groupCard);
    });

    // Add event listeners to newly created inputs
    document.querySelectorAll('.groups-grid .score-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const key = e.target.dataset.key;
        const side = e.target.dataset.side;
        if (!state.matches[key]) state.matches[key] = { home: '', away: '' };
        state.matches[key][side] = e.target.value;
        saveState();
        renderGroupStage();
        renderKnockoutStage();
      });
    });
  }

  function getAdvancingTeams() {
    let top2 = [];
    let thirds = [];
    
    Object.keys(worldCupData.groups).forEach(groupLetter => {
      const standings = calculateStandings(groupLetter);
      top2.push(standings[0]);
      top2.push(standings[1]);
      thirds.push(standings[2]);
    });
    
    // Sort 3rd place teams to find top 8
    thirds.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });
    
    const advancingThirds = thirds.slice(0, 8);
    const allAdvancing = [...top2, ...advancingThirds];
    
    // Fallback if not all matches are played yet
    if (allAdvancing.length < 32 || allAdvancing.some(t => t.pld === 0)) {
       // Return placeholders or current state
    }
    
    return allAdvancing.map(t => t.name);
  }

  function renderKnockoutStage() {
    bracketContainer.innerHTML = '';
    const advancingTeams = getAdvancingTeams();
    
    let previousRoundWinners = advancingTeams;

    worldCupData.knockoutStages.forEach((stage, stageIdx) => {
      const roundDiv = document.createElement('div');
      roundDiv.className = 'bracket-round';
      
      roundDiv.innerHTML = `<div class="round-header">${stage.name}</div>`;
      
      let currentRoundWinners = [];

      for (let i = 0; i < stage.matches; i++) {
        const matchKey = `${stage.id}_m${i}`;
        const score = state.knockout[matchKey] || { home: '', away: '' };
        
        let homeTeam = 'TBD';
        let awayTeam = 'TBD';
        
        if (stageIdx === 0) {
           homeTeam = advancingTeams[i * 2] || 'TBD';
           awayTeam = advancingTeams[i * 2 + 1] || 'TBD';
        } else {
           homeTeam = previousRoundWinners[i * 2] || 'TBD';
           awayTeam = previousRoundWinners[i * 2 + 1] || 'TBD';
        }

        let homeWinner = false;
        let awayWinner = false;
        if (score.home !== '' && score.away !== '') {
          if (parseInt(score.home) > parseInt(score.away)) {
            homeWinner = true;
            currentRoundWinners.push(homeTeam);
          } else if (parseInt(score.away) > parseInt(score.home)) {
            awayWinner = true;
            currentRoundWinners.push(awayTeam);
          } else {
            // Tie - just push a placeholder until a winner is determined (e.g. penalties)
            currentRoundWinners.push('Winner ' + matchKey);
          }
        } else {
          currentRoundWinners.push('Winner ' + matchKey);
        }

        const matchDiv = document.createElement('div');
        matchDiv.className = 'bracket-match';
        matchDiv.innerHTML = `
          <div class="bracket-team ${homeWinner ? 'winner' : ''}">
            <span class="team">${homeTeam}</span>
            <input type="number" min="0" class="score-input knockout-input" data-key="${matchKey}" data-side="home" value="${score.home}">
          </div>
          <div class="bracket-team ${awayWinner ? 'winner' : ''}">
            <span class="team">${awayTeam}</span>
            <input type="number" min="0" class="score-input knockout-input" data-key="${matchKey}" data-side="away" value="${score.away}">
          </div>
        `;
        roundDiv.appendChild(matchDiv);
      }
      
      previousRoundWinners = currentRoundWinners;
      bracketContainer.appendChild(roundDiv);
    });

    document.querySelectorAll('.knockout-bracket .score-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const key = e.target.dataset.key;
        const side = e.target.dataset.side;
        if (!state.knockout[key]) state.knockout[key] = { home: '', away: '' };
        state.knockout[key][side] = e.target.value;
        saveState();
        renderKnockoutStage();
      });
    });
  }

  function renderAll() {
    renderGroupStage();
    renderKnockoutStage();
  }

  renderAll();
});
