document.addEventListener('DOMContentLoaded', () => {
  const groupsContainer = document.getElementById('groups-container');
  const bracketContainer = document.getElementById('bracket-container');
  const knockoutTabs = document.getElementById('knockout-tabs');
  const resetBtn = document.getElementById('resetBtn');

  // State management
  let state = JSON.parse(localStorage.getItem('wc2026_state')) || {
    matches: {}, // key: "group_A_m0", value: { home: '', away: '' }
    knockout: {} // key: "r32_m0", value: { home: '', away: '' }
  };

  let activeInputInfo = null;
  let activeKnockoutStage = 'r32';

  function saveState() {
    localStorage.setItem('wc2026_state', JSON.stringify(state));
  }

  function saveActiveInput() {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') {
      activeInputInfo = {
        key: document.activeElement.dataset.key,
        side: document.activeElement.dataset.side,
        selectionStart: document.activeElement.selectionStart,
        selectionEnd: document.activeElement.selectionEnd
      };
    } else {
      activeInputInfo = null;
    }
  }

  function restoreActiveInput() {
    if (activeInputInfo) {
      const input = document.querySelector(`input[data-key="${activeInputInfo.key}"][data-side="${activeInputInfo.side}"]`);
      if (input) {
        input.focus();
        try {
          input.setSelectionRange(activeInputInfo.selectionStart, activeInputInfo.selectionEnd);
        } catch (e) {}
      }
    }
  }

  resetBtn.addEventListener('click', () => {
    if(confirm('⚠️ WARNING: This will permanently delete all entered match scores, standing data, and bracket progress. This action cannot be undone.\n\nAre you sure you want to continue?')) {
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

  function getTeamFlagHTML(teamName) {
    const code = worldCupData.teamFlags[teamName];
    if (code) {
      return `<img src="https://flagcdn.com/16x12/${code}.png" class="flag-icon" alt="${teamName}">`;
    }
    return `<span class="flag-placeholder">🏳️</span>`;
  }

  function calculateStandings(groupLetter) {
    const teams = worldCupData.groups[groupLetter];
    let standings = teams.map(team => ({
      name: team, pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0
    }));

    worldCupData.groupMatches.forEach((match, index) => {
      const matchKey = `group_${groupLetter}_m${index}`;
      const score = state.matches[matchKey];
      if (score && score.home !== '' && score.away !== '' && score.home !== undefined && score.away !== undefined) {
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

  function updateGroupStandings(groupLetter) {
    const standings = calculateStandings(groupLetter);
    const tbody = document.querySelector(`.standings-container[data-group="${groupLetter}"] tbody`);
    if (!tbody) return;

    let html = '';
    standings.forEach((s, idx) => {
      let rowClass = '';
      if (idx < 2) rowClass = 'advances';
      else if (idx === 2) rowClass = 'maybe-advances';
      
      html += `
        <tr class="${rowClass}">
          <td class="team-name" style="display: flex; align-items: center; gap: 0.5rem;">
            ${getTeamFlagHTML(s.name)} <span>${s.name}</span>
          </td>
          <td>${s.pld}</td><td>${s.w}</td><td>${s.d}</td><td>${s.l}</td><td>${s.gd}</td><td>${s.pts}</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  function initGroupStage() {
    groupsContainer.innerHTML = '';
    
    Object.keys(worldCupData.groups).forEach(groupLetter => {
      const teams = worldCupData.groups[groupLetter];
      
      const groupCard = document.createElement('div');
      groupCard.className = 'glass-panel group-card';
      
      // Standings HTML container
      let standingsHTML = `
        <div class="standings-container" data-group="${groupLetter}">
          <table class="standings-table">
            <thead>
              <tr>
                <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
              </tr>
            </thead>
            <tbody>
              <!-- Injected via updateGroupStandings -->
            </tbody>
          </table>
        </div>
      `;

      // Matches HTML
      let matchesHTML = `<div class="matches-list">`;
      worldCupData.groupMatches.forEach((match, index) => {
        const matchKey = `group_${groupLetter}_m${index}`;
        const score = state.matches[matchKey] || { home: '', away: '' };
        const homeTeam = teams[match[0]];
        const awayTeam = teams[match[1]];
        
        matchesHTML += `
          <div class="match-row">
            <span class="team team-left">
              <span>${homeTeam}</span>
              ${getTeamFlagHTML(homeTeam)}
            </span>
            <div class="score-inputs">
              <input type="number" min="0" class="score-input group-input" data-key="${matchKey}" data-side="home" value="${score.home}">
              <span>-</span>
              <input type="number" min="0" class="score-input group-input" data-key="${matchKey}" data-side="away" value="${score.away}">
            </div>
            <span class="team team-right">
              ${getTeamFlagHTML(awayTeam)}
              <span>${awayTeam}</span>
            </span>
            <button class="btn-clear" data-key="${matchKey}" title="Clear score">&times;</button>
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
      
      // Initial calculation for the group
      updateGroupStandings(groupLetter);
    });
  }

  // Group Stage Event Listeners (using delegation to avoid rewriting listeners)
  groupsContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('score-input')) {
      const key = e.target.dataset.key;
      const side = e.target.dataset.side;
      const groupLetter = key.split('_')[1];
      
      if (!state.matches[key]) state.matches[key] = { home: '', away: '' };
      state.matches[key][side] = e.target.value;
      saveState();
      
      // Update standings for this group only
      updateGroupStandings(groupLetter);
      
      // Propagate changes to knockout stage
      saveActiveInput();
      renderKnockoutStage();
      restoreActiveInput();
    }
  });

  groupsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-clear')) {
      const key = e.target.dataset.key;
      state.matches[key] = { home: '', away: '' };
      saveState();
      
      // Clear inputs in DOM
      const homeInput = groupsContainer.querySelector(`input[data-key="${key}"][data-side="home"]`);
      const awayInput = groupsContainer.querySelector(`input[data-key="${key}"][data-side="away"]`);
      if (homeInput) homeInput.value = '';
      if (awayInput) awayInput.value = '';
      
      const groupLetter = key.split('_')[1];
      updateGroupStandings(groupLetter);
      
      saveActiveInput();
      renderKnockoutStage();
      restoreActiveInput();
    }
  });

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
    
    return allAdvancing.map(t => t.name);
  }

  function renderKnockoutStage() {
    // Render Knockout Tabs
    knockoutTabs.innerHTML = '';
    worldCupData.knockoutStages.forEach(stage => {
      const tabBtn = document.createElement('button');
      tabBtn.className = `tab-btn sub-tab-btn ${activeKnockoutStage === stage.id ? 'active' : ''}`;
      tabBtn.innerText = stage.name;
      tabBtn.dataset.stage = stage.id;
      tabBtn.addEventListener('click', (e) => {
        activeKnockoutStage = e.target.dataset.stage;
        renderKnockoutStage();
      });
      knockoutTabs.appendChild(tabBtn);
    });

    bracketContainer.innerHTML = '';
    const advancingTeams = getAdvancingTeams();
    
    let previousRoundWinners = advancingTeams;

    worldCupData.knockoutStages.forEach((stage, stageIdx) => {
      let currentRoundWinners = [];
      const isStageActive = stage.id === activeKnockoutStage;
      
      let roundDiv;
      if (isStageActive) {
        roundDiv = document.createElement('div');
        roundDiv.className = 'bracket-round active-round';
        roundDiv.innerHTML = `<div class="round-header">${stage.name}</div>`;
      }

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
        if (score.home !== '' && score.away !== '' && score.home !== undefined && score.away !== undefined) {
          if (parseInt(score.home) > parseInt(score.away)) {
            homeWinner = true;
            currentRoundWinners.push(homeTeam);
          } else if (parseInt(score.away) > parseInt(score.home)) {
            awayWinner = true;
            currentRoundWinners.push(awayTeam);
          } else {
            currentRoundWinners.push('Winner ' + matchKey);
          }
        } else {
          currentRoundWinners.push('Winner ' + matchKey);
        }

        if (isStageActive) {
          const matchDiv = document.createElement('div');
          matchDiv.className = 'bracket-match';
          matchDiv.innerHTML = `
            <div class="bracket-team ${homeWinner ? 'winner' : ''}">
              <span class="team" style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start; min-width: 0;">
                ${getTeamFlagHTML(homeTeam)}
                <span class="team-name-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${homeTeam}</span>
              </span>
              <input type="number" min="0" class="score-input knockout-input" data-key="${matchKey}" data-side="home" value="${score.home}">
            </div>
            <div class="bracket-team ${awayWinner ? 'winner' : ''}">
              <span class="team" style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start; min-width: 0;">
                ${getTeamFlagHTML(awayTeam)}
                <span class="team-name-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${awayTeam}</span>
              </span>
              <input type="number" min="0" class="score-input knockout-input" data-key="${matchKey}" data-side="away" value="${score.away}">
            </div>
            <button class="btn-clear btn-clear-ko" data-key="${matchKey}" title="Clear score">&times;</button>
          `;
          roundDiv.appendChild(matchDiv);
        }
      }
      
      previousRoundWinners = currentRoundWinners;
      if (isStageActive) {
        bracketContainer.appendChild(roundDiv);
      }
    });
  }

  // Knockout stage delegation event listeners
  bracketContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('score-input')) {
      const key = e.target.dataset.key;
      const side = e.target.dataset.side;
      
      if (!state.knockout[key]) state.knockout[key] = { home: '', away: '' };
      state.knockout[key][side] = e.target.value;
      saveState();
      
      saveActiveInput();
      renderKnockoutStage();
      restoreActiveInput();
    }
  });

  bracketContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-clear')) {
      const key = e.target.dataset.key;
      state.knockout[key] = { home: '', away: '' };
      saveState();
      
      saveActiveInput();
      renderKnockoutStage();
      restoreActiveInput();
    }
  });

  // Scroll header effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  function renderAll() {
    initGroupStage();
    renderKnockoutStage();
  }

  renderAll();
});
