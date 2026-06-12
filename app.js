document.addEventListener('DOMContentLoaded', () => {
  const groupsContainer = document.getElementById('groups-container');
  const bracketContainer = document.getElementById('bracket-container');
  const knockoutTabs = document.getElementById('knockout-tabs');
  const resetBtn = document.getElementById('resetBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');

  // Theme management
  let currentTheme = localStorage.getItem('wc2026_theme') || 'light';

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none; display: block; width: 20px; height: 20px;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21M4.95 4.95l1.59 1.59m10.91 10.91l1.59 1.59M3 12h2.25m13.5 0H21M4.95 19.05l1.59-1.59m10.91-10.91l1.59-1.59M12 9a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
  `;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none; display: block; width: 20px; height: 20px;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
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

  // Language management
  const translations = {
    en: {
      title: 'FIFA World Cup 2026™',
      subtitle: 'Interactive Fixture & Standings',
      tabGroup: 'Group Stage',
      tabKnockout: 'Knockout Stage',
      colTeam: 'Team',
      colP: 'P',
      colW: 'W',
      colD: 'D',
      colL: 'L',
      colGD: 'GD',
      colPts: 'Pts',
      restartMatch: 'Restart match',
      resetAll: 'Reset All Data',
      resetConfirm: '⚠️ WARNING: This will permanently delete all entered match scores, standing data, and bracket progress. This action cannot be undone.\n\nAre you sure you want to continue?',
      progressCompleteTitle: '🎉 Group Stage Completed! (72/72 Matches Played)',
      progressCompleteDesc: 'All group stage matches have been played. The knockout stage bracket is fully calculated and unlocked!',
      progressIncompleteTitle: '⚠️ Group Stage Incomplete',
      progressIncompleteDesc: 'The knockout stage bracket will be filled once all group matches have been played. Please fill in all group stage scores first.',
      r32: 'Round of 32',
      r16: 'Round of 16',
      qf: 'Quarter-finals',
      sf: 'Semi-finals',
      final: 'Final',
      winner: 'Winner',
      loser: 'Loser',
      winnerShort: 'W',
      loserShort: 'L',
      groupTitle: 'Group',
      thirdPlacePlayoff: '🥉 THIRD-PLACE PLAY-OFF',
      grandFinal: '🏆 GRAND FINAL',
      thirdPlaceShort: '3rd',
      footer: 'World Cup 2026 Fixture Tracker - Mobile Responsive & Local Storage Ready'
    },
    es: {
      title: 'Copa Mundial de la FIFA 2026™',
      subtitle: 'Calendario Interactivo y Clasificaciones',
      tabGroup: 'Fase de Grupos',
      tabKnockout: 'Eliminatorias',
      colTeam: 'Equipo',
      colP: 'PJ',
      colW: 'PG',
      colD: 'PE',
      colL: 'PP',
      colGD: 'DG',
      colPts: 'Pts',
      restartMatch: 'Reiniciar partido',
      resetAll: 'Restablecer Datos',
      resetConfirm: '⚠️ ADVERTENCIA: Esto eliminará permanentemente todos los resultados de los partidos, clasificaciones y progreso de las eliminatorias. Esta acción no se puede deshacer.\n\n¿Estás seguro de que deseas continuar?',
      progressCompleteTitle: '🎉 ¡Fase de Grupos Completada! (72/72 Partidos Jugados)',
      progressCompleteDesc: 'Todos los partidos de la fase de grupos han sido jugados. ¡El cuadro de eliminatorias está completamente calculado y desbloqueado!',
      progressIncompleteTitle: '⚠️ Fase de Grupos Incompleta',
      progressIncompleteDesc: 'El cuadro de eliminatorias se llenará una vez que se hayan jugado todos los partidos de la fase de grupos. Por favor, completa primero todos los resultados de la fase de grupos.',
      r32: 'Dieciseisavos de Final',
      r16: 'Octavos de Final',
      qf: 'Cuartos de Final',
      sf: 'Semifinales',
      final: 'Final',
      winner: 'Ganador',
      loser: 'Perdedor',
      winnerShort: 'G',
      loserShort: 'P',
      groupTitle: 'Grupo',
      thirdPlacePlayoff: '🥉 TERCER PUESTO',
      grandFinal: '🏆 GRAN FINAL',
      thirdPlaceShort: '3º',
      footer: 'Seguidor de la Copa Mundial 2026 - Responsive y con Almacenamiento Local'
    }
  };

  let currentLang = localStorage.getItem('wc2026_lang') || 'es';

  function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
  }

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('wc2026_lang', lang);
    
    // Update selector buttons active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate static DOM elements
    document.getElementById('app-title').innerText = t('title');
    document.getElementById('app-subtitle').innerText = t('subtitle');
    document.getElementById('tab-group').innerText = t('tabGroup');
    document.getElementById('tab-knockout').innerText = t('tabKnockout');
    document.getElementById('footer-text').innerText = t('footer');
    resetBtn.innerText = t('resetAll');
  }

  // Setup language button event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.target.dataset.lang;
      applyLanguage(selectedLang);
      renderAll();
    });
  });

  applyLanguage(currentLang);

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
    if(confirm(t('resetConfirm'))) {
      state = { matches: {}, knockout: {} };
      saveState();
      invalidateGroupCache();
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
    const winnerPrefix = t('winner') + ' ';
    const loserPrefix = t('loser') + ' ';
    if (teamName.startsWith(winnerPrefix)) {
      return teamName.replace(winnerPrefix, t('winnerShort') + ' ');
    }
    if (teamName.startsWith(loserPrefix)) {
      return teamName.replace(loserPrefix, t('loserShort') + ' ');
    }
    // Fallback checks for English defaults to be resilient
    if (teamName.startsWith('Winner ')) {
      return teamName.replace('Winner ', t('winnerShort') + ' ');
    }
    if (teamName.startsWith('Loser ')) {
      return teamName.replace('Loser ', t('loserShort') + ' ');
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
      return `${t('winner')} Final`;
    }
    return `${t('winner')} ${stageName} M${matchIndex + 1}`;
  }

  function formatLoserPlaceholder(stageId, matchIndex) {
    const stageNames = {
      r32: 'R32',
      r16: 'R16',
      qf: 'QF',
      sf: 'SF',
      final: 'Final'
    };
    const stageName = stageNames[stageId] || stageId.toUpperCase();
    return `${t('loser')} ${stageName} M${matchIndex + 1}`;
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


  function getFlagEmoji(countryCode) {
    if (!countryCode) return '🏳️';
    if (countryCode === 'gb-sct') return '🏴󠁧󠁢󠁳󠁣󠁴󠁿';
    if (countryCode === 'gb-eng') return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    try {
      return String.fromCodePoint(...codePoints);
    } catch(e) {
      return '🏳️';
    }
  }

  function getTeamFlagHTML(teamName) {
    const code = worldCupData.teamFlags[teamName];
    if (code) {
      return `<span class="flag-icon" style="font-size: 1.25rem; line-height: 1; flex-shrink: 0;" aria-hidden="true">${getFlagEmoji(code)}</span>`;
    }
    return `<span class="flag-placeholder" style="font-size: 1.25rem; line-height: 1; flex-shrink: 0;" aria-hidden="true">🏳️</span>`;
  }

  function formatMatchDetails(stageId, matchIndex, groupLetter = '') {
    const stadiums = {
      'Dallas': 'AT&T Stadium, Arlington (Dallas)',
      'Atlanta': 'Mercedes-Benz Stadium, Atlanta',
      'Miami': 'Hard Rock Stadium, Miami',
      'NYNJ': 'MetLife Stadium, East Rutherford (New York/New Jersey)',
      'Boston': 'Gillette Stadium, Foxborough (Boston)',
      'LA': 'SoFi Stadium, Inglewood (Los Angeles)',
      'KC': 'Arrowhead Stadium, Kansas City',
      'Seattle': 'Lumen Field, Seattle',
      'SF': "Levi's Stadium, Santa Clara (San Francisco)",
      'Houston': 'NRG Stadium, Houston',
      'Philadelphia': 'Lincoln Financial Field, Philadelphia',
      'Toronto': 'BMO Field, Toronto',
      'Vancouver': 'BC Place, Vancouver',
      'Azteca': 'Estadio Azteca, Mexico City',
      'Guadalajara': 'Estadio Akron, Guadalajara',
      'Monterrey': 'Estadio BBVA, Monterrey'
    };

    let dateStr = '';
    let venue = '';

    if (stageId === 'group') {
      // Group stage matches: June 11 to June 28, 2026
      const groupOffset = groupLetter ? groupLetter.charCodeAt(0) - 65 : 0;
      const globalIndex = groupOffset * 6 + matchIndex;
      
      const dayOffset = Math.floor(globalIndex / 4.3); // Spreads 72 matches over 17 days
      const matchDate = new Date('2026-06-11T16:00:00Z');
      matchDate.setDate(matchDate.getDate() + dayOffset);
      
      // Kickoff hours: 13:00, 16:00, 18:00, 20:00 local time
      const hours = [13, 16, 18, 20];
      matchDate.setHours(hours[globalIndex % 4]);
      
      dateStr = matchDate.toLocaleString(currentLang, {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
      });

      const venueKeys = Object.keys(stadiums);
      venue = stadiums[venueKeys[globalIndex % venueKeys.length]];
    } else {
      // Knockout stages
      const matchDate = new Date('2026-06-28T16:00:00Z'); // R32 starts June 28
      const venueKeys = Object.keys(stadiums);

      if (stageId === 'r32') {
        const dayOffset = Math.floor(matchIndex / 3);
        matchDate.setDate(matchDate.getDate() + dayOffset);
        matchDate.setHours(15 + (matchIndex % 3) * 3);
        venue = stadiums[venueKeys[matchIndex % venueKeys.length]];
      } else if (stageId === 'r16') {
        // July 4 - July 7
        matchDate.setDate(matchDate.getDate() + 6 + Math.floor(matchIndex / 2));
        matchDate.setHours(16 + (matchIndex % 2) * 4);
        venue = stadiums[venueKeys[(matchIndex + 5) % venueKeys.length]];
      } else if (stageId === 'qf') {
        // July 9 - July 11
        // QF Venues: Boston, Los Angeles, Miami, Kansas City
        const qfVenues = ['Boston', 'LA', 'Miami', 'KC'];
        matchDate.setDate(matchDate.getDate() + 11 + Math.floor(matchIndex / 1.5));
        matchDate.setHours(16 + (matchIndex % 2) * 4);
        venue = stadiums[qfVenues[matchIndex % 4]];
      } else if (stageId === 'sf') {
        // July 14 & July 15
        matchDate.setDate(matchDate.getDate() + 16 + matchIndex);
        matchDate.setHours(19);
        venue = matchIndex === 0 ? stadiums['Dallas'] : stadiums['Atlanta'];
      } else if (stageId === 'final') {
        if (matchIndex === 0) {
          // Third-place match: July 18, Miami
          matchDate.setDate(matchDate.getDate() + 20);
          matchDate.setHours(16);
          venue = stadiums['Miami'];
        } else {
          // Final: July 19, NYNJ (MetLife Stadium)
          matchDate.setDate(matchDate.getDate() + 21);
          matchDate.setHours(16);
          venue = stadiums['NYNJ'];
        }
      }

      dateStr = matchDate.toLocaleString(currentLang, {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
      });
    }

    return `<div class="match-details">${dateStr} &bull; ${venue}</div>`;
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
                <th>${t('colTeam')}</th><th>${t('colP')}</th><th>${t('colW')}</th><th>${t('colD')}</th><th>${t('colL')}</th><th>${t('colGD')}</th><th>${t('colPts')}</th>
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
            ${formatMatchDetails('group', index, groupLetter)}
            <div class="match-content">
              <span class="team team-left">
                <span class="team-name-text"><span class="full-name">${homeTeam}</span><span class="short-name">${getTeamShortName(homeTeam)}</span></span>
                ${getTeamFlagHTML(homeTeam)}
              </span>
              <div class="score-inputs">
                <input type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="10" class="score-input group-input" data-key="${matchKey}" data-side="home" value="${score.home}">
                <span>-</span>
                <input type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="10" class="score-input group-input" data-key="${matchKey}" data-side="away" value="${score.away}">
              </div>
              <span class="team team-right">
                ${getTeamFlagHTML(awayTeam)}
                <span class="team-name-text"><span class="full-name">${awayTeam}</span><span class="short-name">${getTeamShortName(awayTeam)}</span></span>
              </span>
            </div>
            <button class="btn-clear" data-key="${matchKey}" title="${t('restartMatch')}">
              ${restartIconSVG}
            </button>
          </div>
        `;
      });
      matchesHTML += `</div>`;

      groupCard.innerHTML = `
        <div class="group-header">${t('groupTitle')} ${groupLetter}</div>
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

  // Cache variables to prevent redundant O(N) calculations on every knockout keystroke
  let cachedAllGroupsPlayed = null;
  let cachedAdvancingTeams = null;
  let cachedGroupProgress = null;

  function invalidateGroupCache() {
    cachedAllGroupsPlayed = null;
    cachedAdvancingTeams = null;
    cachedGroupProgress = null;
  }

  // Group Stage Event Listeners (using delegation to avoid rewriting listeners)
  groupsContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('score-input')) {
      const key = e.target.dataset.key;
      const side = e.target.dataset.side;
      const groupLetter = key.split('_')[1];
      
      let val = e.target.value;
      if (val !== '') {
        let parsed = parseInt(val);
        if (isNaN(parsed) || parsed < 0) parsed = 0;
        if (parsed > 10) parsed = 10;
        val = parsed.toString();
        e.target.value = val; // Sync display input
      }
      
      if (!state.matches[key]) state.matches[key] = { home: '', away: '' };
      state.matches[key][side] = val;
      saveState();
      
      // Update standings for this group only
      updateGroupStandings(groupLetter);
      
      // Invalidate caches before rendering knockout stage
      invalidateGroupCache();

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
      
      invalidateGroupCache();
      saveActiveInput();
      renderKnockoutStage();
      restoreActiveInput();
    }
  });

  function getGroupStageProgress() {
    if (cachedGroupProgress) return cachedGroupProgress;
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
    
    cachedGroupProgress = { playedCount, totalCount };
    return cachedGroupProgress;
  }

  function areAllGroupMatchesPlayed() {
    if (cachedAllGroupsPlayed !== null) return cachedAllGroupsPlayed;
    const { playedCount, totalCount } = getGroupStageProgress();
    cachedAllGroupsPlayed = playedCount === totalCount;
    return cachedAllGroupsPlayed;
  }

  function getAdvancingTeams() {
    if (cachedAdvancingTeams) return cachedAdvancingTeams;

    if (!areAllGroupMatchesPlayed()) {
      return [
        '2A', '2B',
        '1E', `${t('thirdPlaceShort')} A/B/C/D/F`,
        '1F', '2C',
        '1C', '2F',
        '1I', `${t('thirdPlaceShort')} C/D/F/G/H`,
        '2E', '2I',
        '1A', `${t('thirdPlaceShort')} C/E/F/H/I`,
        '1L', `${t('thirdPlaceShort')} E/H/I/J/K`,
        '1D', `${t('thirdPlaceShort')} B/E/F/I/J`,
        '1G', `${t('thirdPlaceShort')} A/E/H/I/J`,
        '2K', '2L',
        '1H', '2J',
        '1B', `${t('thirdPlaceShort')} E/F/G/I/J`,
        '2D', '2G',
        '1J', '2H',
        '1K', `${t('thirdPlaceShort')} D/E/I/J/L`
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
    return cachedAdvancingTeams;
  }

  function isKnockoutStageComplete(stageId) {
    const stage = worldCupData.knockoutStages.find(s => s.id === stageId);
    if (!stage) return false;
    for (let i = 0; i < stage.matches; i++) {
      const matchKey = `${stageId}_m${i}`;
      const score = state.knockout[matchKey];
      if (!score || score.home === '' || score.away === '' || score.home === undefined || score.away === undefined) {
        return false;
      }
    }
    return true;
  }

  function isStageAvailable(stageId) {
    if (!areAllGroupMatchesPlayed()) return false;
    if (stageId === 'r32') return true;
    if (stageId === 'r16') return isKnockoutStageComplete('r32');
    if (stageId === 'qf') return isKnockoutStageComplete('r16');
    if (stageId === 'sf') return isKnockoutStageComplete('qf');
    if (stageId === 'final') return isKnockoutStageComplete('sf');
    return false;
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
            <div class="progress-title">${t('progressCompleteTitle')}</div>
            <div class="progress-description">${t('progressCompleteDesc')}</div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: 100%;"></div>
            </div>
          </div>
        `;
      } else {
        const titleText = `${t('progressIncompleteTitle')} (${playedCount} / ${totalCount})`;
        bannerHTML = `
          <div class="progress-banner incomplete glass-panel">
            <div class="progress-title">${titleText}</div>
            <div class="progress-description">${t('progressIncompleteDesc')}</div>
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
      const available = isStageAvailable(stage.id);
      const activeClass = activeKnockoutStage === stage.id ? 'active' : '';
      const lockedClass = !available ? 'locked-tab' : '';
      tabBtn.className = `tab-btn sub-tab-btn ${activeClass} ${lockedClass}`;
      
      const tabName = t(stage.id);
      tabBtn.innerText = available ? tabName : `🔒 ${tabName}`;
      
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
    let previousRoundLosers = [];

    worldCupData.knockoutStages.forEach((stage, stageIdx) => {
      let currentRoundWinners = [];
      let currentRoundLosers = [];
      const isStageActive = stage.id === activeKnockoutStage;
      
      let roundDiv;
      if (isStageActive) {
        roundDiv = document.createElement('div');
        roundDiv.className = 'bracket-round active-round';
        roundDiv.innerHTML = `<div class="round-header">${t(stage.id)}</div>`;
      }

      for (let i = 0; i < stage.matches; i++) {
        const matchKey = `${stage.id}_m${i}`;
        const score = state.knockout[matchKey] || { home: '', away: '' };
        
        let homeTeam = 'TBD';
        let awayTeam = 'TBD';
        
        if (stageIdx === 0) {
           homeTeam = advancingTeams[i * 2] || 'TBD';
           awayTeam = advancingTeams[i * 2 + 1] || 'TBD';
        } else if (stage.id === 'final') {
           if (i === 0) {
              // 3rd Place Match: Loser SF M1 vs Loser SF M2
              homeTeam = previousRoundLosers[0] || 'TBD';
              awayTeam = previousRoundLosers[1] || 'TBD';
           } else {
              // The Final: Winner SF M1 vs Winner SF M2
              homeTeam = previousRoundWinners[0] || 'TBD';
              awayTeam = previousRoundWinners[1] || 'TBD';
           }
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
            currentRoundLosers.push(awayTeam);
          } else if (parseInt(score.away) > parseInt(score.home)) {
            awayWinner = true;
            currentRoundWinners.push(awayTeam);
            currentRoundLosers.push(homeTeam);
          } else {
            currentRoundWinners.push(formatWinnerPlaceholder(stage.id, i));
            currentRoundLosers.push(formatLoserPlaceholder(stage.id, i));
          }
        } else {
          currentRoundWinners.push(formatWinnerPlaceholder(stage.id, i));
          currentRoundLosers.push(formatLoserPlaceholder(stage.id, i));
        }

        const isPlaceholder = (teamName) => {
          return teamName === 'TBD' ||
                 teamName.startsWith('Winner ') ||
                 teamName.startsWith('Ganador ') ||
                 teamName.startsWith('Loser ') ||
                 teamName.startsWith('Perdedor ') ||
                 teamName.startsWith('3rd ') ||
                 teamName.startsWith('3º ');
        };
        const isMatchDisabled = !areAllGroupMatchesPlayed() || isPlaceholder(homeTeam) || isPlaceholder(awayTeam);

        if (isStageActive) {
          const matchDiv = document.createElement('div');
          const isLocked = !isStageAvailable(stage.id);
          matchDiv.className = `bracket-match ${isLocked ? 'locked' : ''}`;
          let matchLabel = '';
          if (stage.id === 'final') {
            matchLabel = `<div class="match-title" style="text-align: center; font-weight: 800; font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--accent-color);">${i === 0 ? t('thirdPlacePlayoff') : t('grandFinal')}</div>`;
          }
          matchDiv.innerHTML = `
            ${matchLabel}
            ${formatMatchDetails('knockout', stageIdx * 10 + i)}
            <div class="bracket-team ${homeWinner ? 'winner' : ''}">
              <span class="team" style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start; min-width: 0;">
                ${getTeamFlagHTML(homeTeam)}
                <span class="team-name-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="full-name">${homeTeam}</span><span class="short-name">${getTeamShortName(homeTeam)}</span></span>
              </span>
              <input type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="10" class="score-input knockout-input" data-key="${matchKey}" data-side="home" value="${score.home}" ${isMatchDisabled ? 'disabled' : ''}>
            </div>
            <div class="bracket-team ${awayWinner ? 'winner' : ''}">
              <span class="team" style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start; min-width: 0;">
                ${getTeamFlagHTML(awayTeam)}
                <span class="team-name-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="full-name">${awayTeam}</span><span class="short-name">${getTeamShortName(awayTeam)}</span></span>
              </span>
              <input type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="10" class="score-input knockout-input" data-key="${matchKey}" data-side="away" value="${score.away}" ${isMatchDisabled ? 'disabled' : ''}>
            </div>
            <button class="btn-clear btn-clear-ko" data-key="${matchKey}" title="${t('restartMatch')}" ${isMatchDisabled ? 'disabled style="display:none;"' : ''}>
              ${restartIconSVG}
            </button>
          `;
          roundDiv.appendChild(matchDiv);
        }
      }
      
      previousRoundWinners = currentRoundWinners;
      previousRoundLosers = currentRoundLosers;
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
      
      let val = e.target.value;
      if (val !== '') {
        let parsed = parseInt(val);
        if (isNaN(parsed) || parsed < 0) parsed = 0;
        if (parsed > 10) parsed = 10;
        val = parsed.toString();
        e.target.value = val; // Sync display input
      }
      
      if (!state.knockout[key]) state.knockout[key] = { home: '', away: '' };
      state.knockout[key][side] = val;
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

  // Hide loading spinner after page is ready
  const spinnerOverlay = document.getElementById('loading-spinner-overlay');
  if (spinnerOverlay) {
    setTimeout(() => {
      spinnerOverlay.classList.add('hidden');
    }, 350);
  }
});
