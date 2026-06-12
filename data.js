const worldCupData = {
  groups: {
    A: ['Mexico', 'South Africa', 'Korea Republic', 'Czechia'],
    B: ['Canada', 'Bosnia and Herzegovina', 'Qatar', 'Switzerland'],
    C: ['Brazil', 'Morocco', 'Haiti', 'Scotland'],
    D: ['United States', 'Paraguay', 'Australia', 'Türkiye'],
    E: ['Germany', 'Curaçao', 'Ivory Coast', 'Ecuador'],
    F: ['Netherlands', 'Japan', 'Sweden', 'Tunisia'],
    G: ['Belgium', 'Egypt', 'Iran', 'New Zealand'],
    H: ['Spain', 'Cape Verde', 'Saudi Arabia', 'Uruguay'],
    I: ['France', 'Senegal', 'Iraq', 'Norway'],
    J: ['Argentina', 'Algeria', 'Austria', 'Jordan'],
    K: ['Portugal', 'DR Congo', 'Uzbekistan', 'Colombia'],
    L: ['England', 'Croatia', 'Ghana', 'Panama']
  },
  
  teamFlags: {
    'Mexico': 'mx',
    'South Africa': 'za',
    'Korea Republic': 'kr',
    'Czechia': 'cz',
    'Canada': 'ca',
    'Bosnia and Herzegovina': 'ba',
    'Qatar': 'qa',
    'Switzerland': 'ch',
    'Brazil': 'br',
    'Morocco': 'ma',
    'Haiti': 'ht',
    'Scotland': 'gb-sct',
    'United States': 'us',
    'Paraguay': 'py',
    'Australia': 'au',
    'Türkiye': 'tr',
    'Germany': 'de',
    'Curaçao': 'cw',
    'Ivory Coast': 'ci',
    'Ecuador': 'ec',
    'Netherlands': 'nl',
    'Japan': 'jp',
    'Sweden': 'se',
    'Tunisia': 'tn',
    'Belgium': 'be',
    'Egypt': 'eg',
    'Iran': 'ir',
    'New Zealand': 'nz',
    'Spain': 'es',
    'Cape Verde': 'cv',
    'Saudi Arabia': 'sa',
    'Uruguay': 'uy',
    'France': 'fr',
    'Senegal': 'sn',
    'Iraq': 'iq',
    'Norway': 'no',
    'Argentina': 'ar',
    'Algeria': 'dz',
    'Austria': 'at',
    'Jordan': 'jo',
    'Portugal': 'pt',
    'DR Congo': 'cd',
    'Uzbekistan': 'uz',
    'Colombia': 'co',
    'England': 'gb-eng',
    'Croatia': 'hr',
    'Ghana': 'gh',
    'Panama': 'pa'
  },
  
  // Standard format for a 4 team group: 1v2, 3v4, 1v3, 4v2, 4v1, 2v3
  // Indices: 0, 1, 2, 3
  groupMatches: [
    [0, 1], [2, 3], // Matchday 1
    [0, 2], [3, 1], // Matchday 2
    [3, 0], [1, 2]  // Matchday 3
  ],

  // Knockout structure 
  // R32 -> R16 -> QF -> SF -> Final
  knockoutStages: [
    { id: 'r32', name: 'Round of 32', matches: 16 },
    { id: 'r16', name: 'Round of 16', matches: 8 },
    { id: 'qf', name: 'Quarter-finals', matches: 4 },
    { id: 'sf', name: 'Semi-finals', matches: 2 },
    { id: 'final', name: 'Final', matches: 2 }
  ]
};

const matchMetadata = 
  {
    "group_A_m0": {
      "date": "2026-06-11",
      "time": "13:00",
      "stadium": "Mexico City"
    },
    "group_A_m1": {
      "date": "2026-06-11",
      "time": "20:00",
      "stadium": "Guadalajara (Zapopan)"
    },
    "group_A_m2": {
      "date": "2026-06-18",
      "time": "12:00",
      "stadium": "Atlanta"
    },
    "group_A_m3": {
      "date": "2026-06-18",
      "time": "19:00",
      "stadium": "Guadalajara (Zapopan)"
    },
    "group_A_m4": {
      "date": "2026-06-24",
      "time": "19:00",
      "stadium": "Mexico City"
    },
    "group_A_m5": {
      "date": "2026-06-24",
      "time": "19:00",
      "stadium": "Monterrey (Guadalupe)"
    },
    "group_B_m0": {
      "date": "2026-06-12",
      "time": "15:00",
      "stadium": "Toronto"
    },
    "group_B_m1": {
      "date": "2026-06-13",
      "time": "12:00",
      "stadium": "San Francisco Bay Area (Santa Clara)"
    },
    "group_B_m2": {
      "date": "2026-06-18",
      "time": "12:00",
      "stadium": "Los Angeles (Inglewood)"
    },
    "group_B_m3": {
      "date": "2026-06-18",
      "time": "15:00",
      "stadium": "Vancouver"
    },
    "group_B_m4": {
      "date": "2026-06-24",
      "time": "12:00",
      "stadium": "Vancouver"
    },
    "group_B_m5": {
      "date": "2026-06-24",
      "time": "12:00",
      "stadium": "Seattle"
    },
    "group_C_m0": {
      "date": "2026-06-13",
      "time": "18:00",
      "stadium": "New York/New Jersey (East Rutherford)"
    },
    "group_C_m1": {
      "date": "2026-06-13",
      "time": "21:00",
      "stadium": "Boston (Foxborough)"
    },
    "group_C_m2": {
      "date": "2026-06-19",
      "time": "18:00",
      "stadium": "Boston (Foxborough)"
    },
    "group_C_m3": {
      "date": "2026-06-19",
      "time": "20:30",
      "stadium": "Philadelphia"
    },
    "group_C_m4": {
      "date": "2026-06-24",
      "time": "18:00",
      "stadium": "Miami (Miami Gardens)"
    },
    "group_C_m5": {
      "date": "2026-06-24",
      "time": "18:00",
      "stadium": "Atlanta"
    },
    "group_D_m0": {
      "date": "2026-06-12",
      "time": "18:00",
      "stadium": "Los Angeles (Inglewood)"
    },
    "group_D_m1": {
      "date": "2026-06-13",
      "time": "21:00",
      "stadium": "Vancouver"
    },
    "group_D_m2": {
      "date": "2026-06-19",
      "time": "12:00",
      "stadium": "Seattle"
    },
    "group_D_m3": {
      "date": "2026-06-19",
      "time": "20:00",
      "stadium": "San Francisco Bay Area (Santa Clara)"
    },
    "group_D_m4": {
      "date": "2026-06-25",
      "time": "19:00",
      "stadium": "Los Angeles (Inglewood)"
    },
    "group_D_m5": {
      "date": "2026-06-25",
      "time": "19:00",
      "stadium": "San Francisco Bay Area (Santa Clara)"
    },
    "group_E_m0": {
      "date": "2026-06-14",
      "time": "12:00",
      "stadium": "Houston"
    },
    "group_E_m1": {
      "date": "2026-06-14",
      "time": "19:00",
      "stadium": "Philadelphia"
    },
    "group_E_m2": {
      "date": "2026-06-20",
      "time": "16:00",
      "stadium": "Toronto"
    },
    "group_E_m3": {
      "date": "2026-06-20",
      "time": "19:00",
      "stadium": "Kansas City"
    },
    "group_E_m4": {
      "date": "2026-06-25",
      "time": "16:00",
      "stadium": "Philadelphia"
    },
    "group_E_m5": {
      "date": "2026-06-25",
      "time": "16:00",
      "stadium": "New York/New Jersey (East Rutherford)"
    },
    "group_F_m0": {
      "date": "2026-06-14",
      "time": "15:00",
      "stadium": "Dallas (Arlington)"
    },
    "group_F_m1": {
      "date": "2026-06-14",
      "time": "20:00",
      "stadium": "Monterrey (Guadalupe)"
    },
    "group_F_m2": {
      "date": "2026-06-20",
      "time": "12:00",
      "stadium": "Houston"
    },
    "group_F_m3": {
      "date": "2026-06-20",
      "time": "22:00",
      "stadium": "Monterrey (Guadalupe)"
    },
    "group_F_m4": {
      "date": "2026-06-25",
      "time": "18:00",
      "stadium": "Dallas (Arlington)"
    },
    "group_F_m5": {
      "date": "2026-06-25",
      "time": "18:00",
      "stadium": "Kansas City"
    },
    "group_G_m0": {
      "date": "2026-06-15",
      "time": "12:00",
      "stadium": "Seattle"
    },
    "group_G_m1": {
      "date": "2026-06-15",
      "time": "18:00",
      "stadium": "Los Angeles (Inglewood)"
    },
    "group_G_m2": {
      "date": "2026-06-21",
      "time": "12:00",
      "stadium": "Los Angeles (Inglewood)"
    },
    "group_G_m3": {
      "date": "2026-06-21",
      "time": "18:00",
      "stadium": "Vancouver"
    },
    "group_G_m4": {
      "date": "2026-06-26",
      "time": "20:00",
      "stadium": "Seattle"
    },
    "group_G_m5": {
      "date": "2026-06-26",
      "time": "20:00",
      "stadium": "Vancouver"
    },
    "group_H_m0": {
      "date": "2026-06-15",
      "time": "12:00",
      "stadium": "Atlanta"
    },
    "group_H_m1": {
      "date": "2026-06-15",
      "time": "18:00",
      "stadium": "Miami (Miami Gardens)"
    },
    "group_H_m2": {
      "date": "2026-06-21",
      "time": "12:00",
      "stadium": "Atlanta"
    },
    "group_H_m3": {
      "date": "2026-06-21",
      "time": "18:00",
      "stadium": "Miami (Miami Gardens)"
    },
    "group_H_m4": {
      "date": "2026-06-26",
      "time": "18:00",
      "stadium": "Guadalajara (Zapopan)"
    },
    "group_H_m5": {
      "date": "2026-06-26",
      "time": "19:00",
      "stadium": "Houston"
    },
    "group_I_m0": {
      "date": "2026-06-16",
      "time": "15:00",
      "stadium": "New York/New Jersey (East Rutherford)"
    },
    "group_I_m1": {
      "date": "2026-06-16",
      "time": "18:00",
      "stadium": "Boston (Foxborough)"
    },
    "group_I_m2": {
      "date": "2026-06-22",
      "time": "17:00",
      "stadium": "Philadelphia"
    },
    "group_I_m3": {
      "date": "2026-06-22",
      "time": "20:00",
      "stadium": "New York/New Jersey (East Rutherford)"
    },
    "group_I_m4": {
      "date": "2026-06-26",
      "time": "15:00",
      "stadium": "Boston (Foxborough)"
    },
    "group_I_m5": {
      "date": "2026-06-26",
      "time": "15:00",
      "stadium": "Toronto"
    },
    "group_J_m0": {
      "date": "2026-06-16",
      "time": "20:00",
      "stadium": "Kansas City"
    },
    "group_J_m1": {
      "date": "2026-06-16",
      "time": "21:00",
      "stadium": "San Francisco Bay Area (Santa Clara)"
    },
    "group_J_m2": {
      "date": "2026-06-22",
      "time": "12:00",
      "stadium": "Dallas (Arlington)"
    },
    "group_J_m3": {
      "date": "2026-06-22",
      "time": "20:00",
      "stadium": "San Francisco Bay Area (Santa Clara)"
    },
    "group_J_m4": {
      "date": "2026-06-27",
      "time": "21:00",
      "stadium": "Kansas City"
    },
    "group_J_m5": {
      "date": "2026-06-27",
      "time": "21:00",
      "stadium": "Dallas (Arlington)"
    },
    "group_K_m0": {
      "date": "2026-06-17",
      "time": "12:00",
      "stadium": "Houston"
    },
    "group_K_m1": {
      "date": "2026-06-17",
      "time": "20:00",
      "stadium": "Mexico City"
    },
    "group_K_m2": {
      "date": "2026-06-23",
      "time": "12:00",
      "stadium": "Houston"
    },
    "group_K_m3": {
      "date": "2026-06-23",
      "time": "20:00",
      "stadium": "Guadalajara (Zapopan)"
    },
    "group_K_m4": {
      "date": "2026-06-27",
      "time": "19:30",
      "stadium": "Miami (Miami Gardens)"
    },
    "group_K_m5": {
      "date": "2026-06-27",
      "time": "19:30",
      "stadium": "Atlanta"
    },
    "group_L_m0": {
      "date": "2026-06-17",
      "time": "15:00",
      "stadium": "Dallas (Arlington)"
    },
    "group_L_m1": {
      "date": "2026-06-17",
      "time": "19:00",
      "stadium": "Toronto"
    },
    "group_L_m2": {
      "date": "2026-06-23",
      "time": "16:00",
      "stadium": "Boston (Foxborough)"
    },
    "group_L_m3": {
      "date": "2026-06-23",
      "time": "19:00",
      "stadium": "Toronto"
    },
    "group_L_m4": {
      "date": "2026-06-27",
      "time": "17:00",
      "stadium": "New York/New Jersey (East Rutherford)"
    },
    "group_L_m5": {
      "date": "2026-06-27",
      "time": "17:00",
      "stadium": "Philadelphia"
    },
    "r32_m0": {
      "date": "2026-06-28",
      "time": "12:00",
      "stadium": "Los Angeles (Inglewood)"
    },
    "r32_m1": {
      "date": "2026-06-29",
      "time": "12:00",
      "stadium": "Houston"
    },
    "r32_m2": {
      "date": "2026-06-29",
      "time": "16:30",
      "stadium": "Boston (Foxborough)"
    },
    "r32_m3": {
      "date": "2026-06-29",
      "time": "19:00",
      "stadium": "Monterrey (Guadalupe)"
    },
    "r32_m4": {
      "date": "2026-06-30",
      "time": "12:00",
      "stadium": "Dallas (Arlington)"
    },
    "r32_m5": {
      "date": "2026-06-30",
      "time": "17:00",
      "stadium": "New York/New Jersey (East Rutherford)"
    },
    "r32_m6": {
      "date": "2026-06-30",
      "time": "19:00",
      "stadium": "Mexico City"
    },
    "r32_m7": {
      "date": "2026-07-01",
      "time": "12:00",
      "stadium": "Atlanta"
    },
    "r32_m8": {
      "date": "2026-07-01",
      "time": "13:00",
      "stadium": "Seattle"
    },
    "r32_m9": {
      "date": "2026-07-01",
      "time": "17:00",
      "stadium": "San Francisco Bay Area (Santa Clara)"
    },
    "r32_m10": {
      "date": "2026-07-02",
      "time": "12:00",
      "stadium": "Los Angeles (Inglewood)"
    },
    "r32_m11": {
      "date": "2026-07-02",
      "time": "19:00",
      "stadium": "Toronto"
    },
    "r32_m12": {
      "date": "2026-07-02",
      "time": "20:00",
      "stadium": "Vancouver"
    },
    "r32_m13": {
      "date": "2026-07-03",
      "time": "13:00",
      "stadium": "Dallas (Arlington)"
    },
    "r32_m14": {
      "date": "2026-07-03",
      "time": "18:00",
      "stadium": "Miami (Miami Gardens)"
    },
    "r32_m15": {
      "date": "2026-07-03",
      "time": "20:30",
      "stadium": "Kansas City"
    },
    "r16_m0": {
      "date": "2026-07-04",
      "time": "12:00",
      "stadium": "Houston"
    },
    "r16_m1": {
      "date": "2026-07-04",
      "time": "17:00",
      "stadium": "Philadelphia"
    },
    "r16_m2": {
      "date": "2026-07-05",
      "time": "16:00",
      "stadium": "New York/New Jersey (East Rutherford)"
    },
    "r16_m3": {
      "date": "2026-07-05",
      "time": "18:00",
      "stadium": "Mexico City"
    },
    "r16_m4": {
      "date": "2026-07-06",
      "time": "14:00",
      "stadium": "Dallas (Arlington)"
    },
    "r16_m5": {
      "date": "2026-07-06",
      "time": "17:00",
      "stadium": "Seattle"
    },
    "r16_m6": {
      "date": "2026-07-07",
      "time": "12:00",
      "stadium": "Atlanta"
    },
    "r16_m7": {
      "date": "2026-07-07",
      "time": "13:00",
      "stadium": "Vancouver"
    },
    "qf_m0": {
      "date": "2026-07-09",
      "time": "16:00",
      "stadium": "Boston (Foxborough)"
    },
    "qf_m1": {
      "date": "2026-07-10",
      "time": "12:00",
      "stadium": "Los Angeles (Inglewood)"
    },
    "qf_m2": {
      "date": "2026-07-11",
      "time": "17:00",
      "stadium": "Miami (Miami Gardens)"
    },
    "qf_m3": {
      "date": "2026-07-11",
      "time": "20:00",
      "stadium": "Kansas City"
    },
    "sf_m0": {
      "date": "2026-07-14",
      "time": "14:00",
      "stadium": "Dallas (Arlington)"
    },
    "sf_m1": {
      "date": "2026-07-15",
      "time": "15:00",
      "stadium": "Atlanta"
    },
    "final_m0": {
      "date": "2026-07-18",
      "time": "17:00",
      "stadium": "Miami (Miami Gardens)"
    },
    "final_m1": {
      "date": "2026-07-19",
      "time": "15:00",
      "stadium": "New York/New Jersey (East Rutherford)"
    }
  };
