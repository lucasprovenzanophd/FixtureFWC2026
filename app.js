document.addEventListener('DOMContentLoaded', () => {
  const groupsContainer = document.getElementById('groups-container');
  const bracketContainer = document.getElementById('bracket-container');
  const knockoutTabs = document.getElementById('knockout-tabs');
  const resetBtn = document.getElementById('resetBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');

  // Theme management
  let currentTheme = localStorage.getItem('wc2026_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  `;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  `;

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      themeIcon.innerHTML = moonIcon;
    } else {
      document.body.classList.remove('light-theme');
      themeIcon.innerHTML = sunIcon;
    }
    localStorage.setItem('wc2026_theme', theme);
  }

  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });

  applyTheme(currentTheme);

  // State management
  let state = JSON.parse(localStorage.getItem('wc2026_state')) || {
    matches: {}, // key: "group_A_m0", value: { home: '', away: '' }
    knockout: {} // key: "r32_m0", value: { home: '', away: '' }
  };

  // Dev testing helper: appending ?mock=true fills all group stage matches automatically
  if (new URLSearchParams(window.location.search).get('mock') === 'true') {
    Object.keys(worldCupData.groups).forEach(groupLetter => {
      worldCupData.groupMatches.forEach((match, index) => {
        const matchKey = `group_${groupLetter}_m${index}`;
        state.matches[matchKey] = { home: '2', away: '1' };
      });
    });
    localStorage.setItem('wc2026_state', JSON.stringify(state));
  }

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

  const teamShortNames = {
    'Mexico': 'MEX', 'South Africa': 'RSA', 'Korea Republic': 'KOR', 'Czechia': 'CZE',
    'Canada': 'CAN', 'Bosnia and Herzegovina': 'BIH', 'Qatar': 'QAT', 'Switzerland': 'SUI',
    'Brazil': 'BRA', 'Morocco': 'MAR', 'Haiti': 'HAI', 'Scotland': 'SCO',
    'United States': 'USA', 'Paraguay': 'PAR', 'Australia': 'AUS', 'Türkiye': 'TUR',
    'Germany': 'GER', 'Curaçao': 'CUW', 'Ivory Coast': 'CIV', 'Ecuador': 'ECU',
    'Netherlands': 'NED', 'Japan': 'JPN', 'Sweden': 'SWE', 'Tunisia': 'TUN',
    'Belgium': 'BEL', 'Egypt': 'EGY', 'Iran': 'IRN', 'New Zealand': 'NZL',
    'Spain': 'ESP', 'Cape Verde': 'CPV', 'Saudi Arabia': 'KSA', 'Uruguay': 'URU',
    'France': 'FRA', 'Senegal': 'SEN', 'Iraq': 'IRQ', 'Norway': 'NOR',
    'Argentina': 'ARG', 'Algeria': 'ALG', 'Austria': 'AUT', 'Jordan': 'JOR',
    'Portugal': 'POR', 'DR Congo': 'COD', 'Uzbekistan': 'UZB', 'Colombia': 'COL',
    'England': 'ENG', 'Croatia': 'CRO', 'Ghana': 'GHA', 'Panama': 'PAN'
  };

  function getTeamShortName(teamName) {
    if (teamShortNames[teamName]) {
      return teamShortNames[teamName];
    }
    // Handle "Winner XXX MX" placeholders
    if (teamName.startsWith('Winner ')) {
      return teamName.replace('Winner ', 'W ');
    }
    return teamName;
  }

  function formatWinnerPlaceholder(stageId, matchIndex) {
    const stageNames = {
      r32: 'R32',
      r16: 'R16',
      qf: 'QF',
      sf: 'SF',
      final: 'Final'
    };
    const stageName = stageNames[stageId] || stageId.toUpperCase();
    if (stageId === 'final') {
      return `Winner Final`;
    }
    return `Winner ${stageName} M${matchIndex + 1}`;
  }

  function allocateThirds(qualifiedThirds, slots) {
    let result = null;
    const used = Array(8).fill(false);
    const current = [];

    function backtrack(index) {
      if (result) return;
      if (index === 8) {
        result = [...current];
        return;
      }
      for (let i = 0; i < 8; i++) {
        if (!used[i]) {
          const team = qualifiedThirds[i];
          if (slots[index].allowed.includes(team.group)) {
            used[i] = true;
            current.push(team);
            backtrack(index + 1);
            current.pop();
            used[i] = false;
          }
        }
      }
    }

    backtrack(0);
    return result || qualifiedThirds;
  }

  const knockoutBracketMapping = {
    r16: [
      [1, 4],   // Match 89: Winner Match 74 (index 1) vs Winner Match 77 (index 4)
      [0, 2],   // Match 90: Winner Match 73 (index 0) vs Winner Match 75 (index 2)
      [3, 5],   // Match 91: Winner Match 76 (index 3) vs Winner Match 78 (index 5)
      [6, 7],   // Match 92: Winner Match 79 (index 6) vs Winner Match 80 (index 7)
      [10, 11], // Match 93: Winner Match 83 (index 10) vs Winner Match 84 (index 11)
      [8, 9],   // Match 94: Winner Match 81 (index 8) vs Winner Match 82 (index 9)
      [13, 15], // Match 95: Winner Match 86 (index 13) vs Winner Match 88 (index 15)
      [12, 14]  // Match 96: Winner Match 85 (index 12) vs Winner Match 87 (index 14)
    ],
    qf: [
      [0, 1],   // Match 97: Winner Match 89 (index 0) vs Winner Match 90 (index 1)
      [4, 5],   // Match 98: Winner Match 93 (index 4) vs Winner Match 94 (index 5)
      [2, 3],   // Match 99: Winner Match 91 (index 2) vs Winner Match 92 (index 3)
      [6, 7]    // Match 100: Winner Match 95 (index 6) vs Winner Match 96 (index 7)
    ],
    sf: [
      [0, 1],   // Match 101: Winner Match 97 (index 0) vs Winner Match 98 (index 1)
      [2, 3]    // Match 102: Winner Match 99 (index 2) vs Winner Match 100 (index 3)
    ],
    final: [
      [0, 1]    // Match 104: Winner Match 101 (index 0) vs Winner Match 102 (index 1)
    ]
  };


  function getTeamFlagHTML(teamName) {
    const code = worldCupData.teamFlags[teamName];
    if (code) {
      return `<img src="https://flagcdn.com/16x12/${code}.png" class="flag-icon" alt="${teamName}">`;
    }
    return `<span class="flag-placeholder">🏳️</span>`;
  }

  function formatMatchDetails(stageType, index) {
    const stadiums = [
      'Estadio Azteca, Mexico City', 'MetLife Stadium, New Jersey', 'AT&T Stadium, Arlington',
      'Arrowhead Stadium, Kansas City', 'NRG Stadium, Houston', 'Mercedes-Benz Stadium, Atlanta',
      'SoFi Stadium, Los Angeles', 'Lincoln Financial Field, Philadelphia', 'Lumen Field, Seattle',
      "Levi's Stadium, Santa Clara", 'Gillette Stadium, Foxborough', 'Hard Rock Stadium, Miami',
      'BC Place, Vancouver', 'BMO Field, Toronto', 'Estadio Akron, Guadalajara', 'Estadio BBVA, Monterrey'
    ];
    const startDate = new Date('2026-06-11T16:00:00Z');
    let matchDate = new Date(startDate.getTime());
    if (stageType === 'group') {
      matchDate.setHours(matchDate.getHours() + index * 4);
    } else {
      matchDate.setDate(matchDate.getDate() + 15 + index);
    }
    const stadium = stadiums[index % stadiums.length];
    
    const formattedDate = matchDate.toLocaleString(undefined, {
      weekday: 'short', month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
    });
    return `<div class="match-details">${formattedDate} &bull; ${stadium}</div>`;
  }

  const restartIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  `;

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
            ${getTeamFlagHTML(s.name)} <span class="team-name-text"><span class="full-name">${s.name}</span><span class="short-name">${getTeamShortName(s.name)}</span></span>
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
            ${formatMatchDetails('group', index)}
            <div class="match-content">
              <span class="team team-left">
                <span class="team-name-text"><span class="full-name">${homeTeam}</span><span class="short-name">${getTeamShortName(homeTeam)}</span></span>
                ${getTeamFlagHTML(homeTeam)}
              </span>
              <div class="score-inputs">
                <input type="number" min="0" class="score-input group-input" data-key="${matchKey}" data-side="home" value="${score.home}">
                <span>-</span>
                <input type="number" min="0" class="score-input group-input" data-key="${matchKey}" data-side="away" value="${score.away}">
              </div>
              <span class="team team-right">
                ${getTeamFlagHTML(awayTeam)}
                <span class="team-name-text"><span class="full-name">${awayTeam}</span><span class="short-name">${getTeamShortName(awayTeam)}</span></span>
              </span>
            </div>
            <button class="btn-clear" data-key="${matchKey}" title="Restart match">
              ${restartIconSVG}
            </button>
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
    const clearBtn = e.target.closest('.btn-clear');
    if (clearBtn) {
      const key = clearBtn.dataset.key;
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

  function getGroupStageProgress() {
    let playedCount = 0;
    let totalCount = 0;
    
    Object.keys(worldCupData.groups).forEach(groupLetter => {
      worldCupData.groupMatches.forEach((match, index) => {
        totalCount++;
        const matchKey = `group_${groupLetter}_m${index}`;
        const score = state.matches[matchKey];
        if (score && score.home !== '' && score.away !== '' && score.home !== undefined && score.away !== undefined) {
          playedCount++;
        }
      });
    });
    
    return { playedCount, totalCount };
  }

  function areAllGroupMatchesPlayed() {
    const { playedCount, totalCount } = getGroupStageProgress();
    return playedCount === totalCount;
  }

  function getAdvancingTeams() {
    if (!areAllGroupMatchesPlayed()) {
      return [
        '2A', '2B',
        '1E', '3rd A/B/C/D/F',
        '1F', '2C',
        '1C', '2F',
        '1I', '3rd C/D/F/G/H',
        '2E', '2I',
        '1A', '3rd C/E/F/H/I',
        '1L', '3rd E/H/I/J/K',
        '1D', '3rd B/E/F/I/J',
        '1G', '3rd A/E/H/I/J',
        '2K', '2L',
        '1H', '2J',
        '1B', '3rd E/F/G/I/J',
        '2D', '2G',
        '1J', '2H',
        '1K', '3rd D/E/I/J/L'
      ];
    }

    const standingsByGroup = {};
    Object.keys(worldCupData.groups).forEach(groupLetter => {
      const standings = calculateStandings(groupLetter);
      standingsByGroup[groupLetter] = {
        winner: standings[0].name,
        runnerUp: standings[1].name,
        third: standings[2].name
      };
    });

    let thirds = [];
    Object.keys(worldCupData.groups).forEach(groupLetter => {
      const standings = calculateStandings(groupLetter);
      thirds.push({
        name: standings[2].name,
        group: groupLetter,
        pts: standings[2].pts,
        gd: standings[2].gd,
        gf: standings[2].gf
      });
    });
    thirds.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });
    const qualifiedThirds = thirds.slice(0, 8);

    const slots = [
      { name: '1E', allowed: ['A', 'B', 'C', 'D', 'F'] },
      { name: '1I', allowed: ['C', 'D', 'F', 'G', 'H'] },
      { name: '1A', allowed: ['C', 'E', 'F', 'H', 'I'] },
      { name: '1L', allowed: ['E', 'H', 'I', 'J', 'K'] },
      { name: '1D', allowed: ['B', 'E', 'F', 'I', 'J'] },
      { name: '1G', allowed: ['A', 'E', 'H', 'I', 'J'] },
      { name: '1B', allowed: ['E', 'F', 'G', 'I', 'J'] },
      { name: '1K', allowed: ['D', 'E', 'I', 'J', 'L'] }
    ];

    const allocated = allocateThirds(qualifiedThirds, slots);

    return [
      standingsByGroup['A'].runnerUp, standingsByGroup['B'].runnerUp,
      standingsByGroup['E'].winner, allocated[0].name,
      standingsByGroup['F'].winner, standingsByGroup['C'].runnerUp,
      standingsByGroup['C'].winner, standingsByGroup['F'].runnerUp,
      standingsByGroup['I'].winner, allocated[1].name,
      standingsByGroup['E'].runnerUp, standingsByGroup['I'].runnerUp,
      standingsByGroup['A'].winner, allocated[2].name,
      standingsByGroup['L'].winner, allocated[3].name,
      standingsByGroup['D'].winner, allocated[4].name,
      standingsByGroup['G'].winner, allocated[5].name,
      standingsByGroup['K'].runnerUp, standingsByGroup['L'].runnerUp,
      standingsByGroup['H'].winner, standingsByGroup['J'].runnerUp,
      standingsByGroup['B'].winner, allocated[6].name,
      standingsByGroup['D'].runnerUp, standingsByGroup['G'].runnerUp,
      standingsByGroup['J'].winner, standingsByGroup['H'].runnerUp,
      standingsByGroup['K'].winner, allocated[7].name
    ];
  }

  function renderKnockoutStage() {
    // Render progress banner
    const progressContainer = document.getElementById('knockout-progress-container');
    if (progressContainer) {
      const { playedCount, totalCount } = getGroupStageProgress();
      const pct = totalCount > 0 ? (playedCount / totalCount) * 100 : 0;
      const isComplete = playedCount === totalCount;
      
      let bannerHTML = '';
      if (isComplete) {
        bannerHTML = `
          <div class="progress-banner complete glass-panel">
            <div class="progress-title">🎉 Group Stage Completed! (72/72 Matches Played)</div>
            <div class="progress-description">All group stage matches have been played. The knockout stage bracket is fully calculated and unlocked!</div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: 100%;"></div>
            </div>
          </div>
        `;
      } else {
        bannerHTML = `
          <div class="progress-banner incomplete glass-panel">
            <div class="progress-title">⚠️ Group Stage Incomplete (${playedCount} / ${totalCount} Matches Played)</div>
            <div class="progress-description">The knockout stage bracket will be filled once all group matches have been played. Please fill in all group stage scores first.</div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }
      progressContainer.innerHTML = bannerHTML;
    }

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
           const mapping = knockoutBracketMapping[stage.id][i];
           homeTeam = previousRoundWinners[mapping[0]] || 'TBD';
           awayTeam = previousRoundWinners[mapping[1]] || 'TBD';
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
            currentRoundWinners.push(formatWinnerPlaceholder(stage.id, i));
          }
        } else {
          currentRoundWinners.push(formatWinnerPlaceholder(stage.id, i));
        }

        const isMatchDisabled = !areAllGroupMatchesPlayed() || homeTeam.startsWith('Winner ') || awayTeam.startsWith('Winner ');

        if (isStageActive) {
          const matchDiv = document.createElement('div');
          matchDiv.className = 'bracket-match';
          matchDiv.innerHTML = `
            ${formatMatchDetails('knockout', stageIdx * 10 + i)}
            <div class="bracket-team ${homeWinner ? 'winner' : ''}">
              <span class="team" style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start; min-width: 0;">
                ${getTeamFlagHTML(homeTeam)}
                <span class="team-name-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="full-name">${homeTeam}</span><span class="short-name">${getTeamShortName(homeTeam)}</span></span>
              </span>
              <input type="number" min="0" class="score-input knockout-input" data-key="${matchKey}" data-side="home" value="${score.home}" ${isMatchDisabled ? 'disabled' : ''}>
            </div>
            <div class="bracket-team ${awayWinner ? 'winner' : ''}">
              <span class="team" style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start; min-width: 0;">
                ${getTeamFlagHTML(awayTeam)}
                <span class="team-name-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="full-name">${awayTeam}</span><span class="short-name">${getTeamShortName(awayTeam)}</span></span>
              </span>
              <input type="number" min="0" class="score-input knockout-input" data-key="${matchKey}" data-side="away" value="${score.away}" ${isMatchDisabled ? 'disabled' : ''}>
            </div>
            <button class="btn-clear btn-clear-ko" data-key="${matchKey}" title="Restart match" ${isMatchDisabled ? 'disabled style="display:none;"' : ''}>
              ${restartIconSVG}
            </button>
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
    const clearBtn = e.target.closest('.btn-clear');
    if (clearBtn) {
      const key = clearBtn.dataset.key;
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
