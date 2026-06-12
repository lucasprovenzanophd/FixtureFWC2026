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
    "utcDate": "2026-06-11T19:00:00Z",
    "stadium": "Mexico City"
  },
  "group_A_m1": {
    "utcDate": "2026-06-12T02:00:00Z",
    "stadium": "Guadalajara (Zapopan)"
  },
  "group_A_m2": {
    "utcDate": "2026-06-18T16:00:00Z",
    "stadium": "Atlanta"
  },
  "group_A_m3": {
    "utcDate": "2026-06-19T01:00:00Z",
    "stadium": "Guadalajara (Zapopan)"
  },
  "group_A_m4": {
    "utcDate": "2026-06-25T01:00:00Z",
    "stadium": "Mexico City"
  },
  "group_A_m5": {
    "utcDate": "2026-06-25T01:00:00Z",
    "stadium": "Monterrey (Guadalupe)"
  },
  "group_B_m0": {
    "utcDate": "2026-06-12T19:00:00Z",
    "stadium": "Toronto"
  },
  "group_B_m1": {
    "utcDate": "2026-06-13T19:00:00Z",
    "stadium": "San Francisco Bay Area (Santa Clara)"
  },
  "group_B_m2": {
    "utcDate": "2026-06-18T19:00:00Z",
    "stadium": "Los Angeles (Inglewood)"
  },
  "group_B_m3": {
    "utcDate": "2026-06-18T22:00:00Z",
    "stadium": "Vancouver"
  },
  "group_B_m4": {
    "utcDate": "2026-06-24T19:00:00Z",
    "stadium": "Vancouver"
  },
  "group_B_m5": {
    "utcDate": "2026-06-24T19:00:00Z",
    "stadium": "Seattle"
  },
  "group_C_m0": {
    "utcDate": "2026-06-13T22:00:00Z",
    "stadium": "New York/New Jersey (East Rutherford)"
  },
  "group_C_m1": {
    "utcDate": "2026-06-14T01:00:00Z",
    "stadium": "Boston (Foxborough)"
  },
  "group_C_m2": {
    "utcDate": "2026-06-19T22:00:00Z",
    "stadium": "Boston (Foxborough)"
  },
  "group_C_m3": {
    "utcDate": "2026-06-20T00:30:00Z",
    "stadium": "Philadelphia"
  },
  "group_C_m4": {
    "utcDate": "2026-06-24T22:00:00Z",
    "stadium": "Miami (Miami Gardens)"
  },
  "group_C_m5": {
    "utcDate": "2026-06-24T22:00:00Z",
    "stadium": "Atlanta"
  },
  "group_D_m0": {
    "utcDate": "2026-06-13T01:00:00Z",
    "stadium": "Los Angeles (Inglewood)"
  },
  "group_D_m1": {
    "utcDate": "2026-06-14T04:00:00Z",
    "stadium": "Vancouver"
  },
  "group_D_m2": {
    "utcDate": "2026-06-19T19:00:00Z",
    "stadium": "Seattle"
  },
  "group_D_m3": {
    "utcDate": "2026-06-20T03:00:00Z",
    "stadium": "San Francisco Bay Area (Santa Clara)"
  },
  "group_D_m4": {
    "utcDate": "2026-06-26T02:00:00Z",
    "stadium": "Los Angeles (Inglewood)"
  },
  "group_D_m5": {
    "utcDate": "2026-06-26T02:00:00Z",
    "stadium": "San Francisco Bay Area (Santa Clara)"
  },
  "group_E_m0": {
    "utcDate": "2026-06-14T17:00:00Z",
    "stadium": "Houston"
  },
  "group_E_m1": {
    "utcDate": "2026-06-14T23:00:00Z",
    "stadium": "Philadelphia"
  },
  "group_E_m2": {
    "utcDate": "2026-06-20T20:00:00Z",
    "stadium": "Toronto"
  },
  "group_E_m3": {
    "utcDate": "2026-06-21T00:00:00Z",
    "stadium": "Kansas City"
  },
  "group_E_m4": {
    "utcDate": "2026-06-25T20:00:00Z",
    "stadium": "Philadelphia"
  },
  "group_E_m5": {
    "utcDate": "2026-06-25T20:00:00Z",
    "stadium": "New York/New Jersey (East Rutherford)"
  },
  "group_F_m0": {
    "utcDate": "2026-06-14T20:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "group_F_m1": {
    "utcDate": "2026-06-15T02:00:00Z",
    "stadium": "Monterrey (Guadalupe)"
  },
  "group_F_m2": {
    "utcDate": "2026-06-20T17:00:00Z",
    "stadium": "Houston"
  },
  "group_F_m3": {
    "utcDate": "2026-06-21T04:00:00Z",
    "stadium": "Monterrey (Guadalupe)"
  },
  "group_F_m4": {
    "utcDate": "2026-06-25T23:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "group_F_m5": {
    "utcDate": "2026-06-25T23:00:00Z",
    "stadium": "Kansas City"
  },
  "group_G_m0": {
    "utcDate": "2026-06-15T19:00:00Z",
    "stadium": "Seattle"
  },
  "group_G_m1": {
    "utcDate": "2026-06-16T01:00:00Z",
    "stadium": "Los Angeles (Inglewood)"
  },
  "group_G_m2": {
    "utcDate": "2026-06-21T19:00:00Z",
    "stadium": "Los Angeles (Inglewood)"
  },
  "group_G_m3": {
    "utcDate": "2026-06-22T01:00:00Z",
    "stadium": "Vancouver"
  },
  "group_G_m4": {
    "utcDate": "2026-06-27T03:00:00Z",
    "stadium": "Seattle"
  },
  "group_G_m5": {
    "utcDate": "2026-06-27T03:00:00Z",
    "stadium": "Vancouver"
  },
  "group_H_m0": {
    "utcDate": "2026-06-15T16:00:00Z",
    "stadium": "Atlanta"
  },
  "group_H_m1": {
    "utcDate": "2026-06-15T22:00:00Z",
    "stadium": "Miami (Miami Gardens)"
  },
  "group_H_m2": {
    "utcDate": "2026-06-21T16:00:00Z",
    "stadium": "Atlanta"
  },
  "group_H_m3": {
    "utcDate": "2026-06-21T22:00:00Z",
    "stadium": "Miami (Miami Gardens)"
  },
  "group_H_m4": {
    "utcDate": "2026-06-27T00:00:00Z",
    "stadium": "Houston"
  },
  "group_H_m5": {
    "utcDate": "2026-06-27T00:00:00Z",
    "stadium": "Guadalajara (Zapopan)"
  },
  "group_I_m0": {
    "utcDate": "2026-06-16T19:00:00Z",
    "stadium": "New York/New Jersey (East Rutherford)"
  },
  "group_I_m1": {
    "utcDate": "2026-06-16T22:00:00Z",
    "stadium": "Boston (Foxborough)"
  },
  "group_I_m2": {
    "utcDate": "2026-06-22T21:00:00Z",
    "stadium": "Philadelphia"
  },
  "group_I_m3": {
    "utcDate": "2026-06-23T00:00:00Z",
    "stadium": "New York/New Jersey (East Rutherford)"
  },
  "group_I_m4": {
    "utcDate": "2026-06-26T19:00:00Z",
    "stadium": "Boston (Foxborough)"
  },
  "group_I_m5": {
    "utcDate": "2026-06-26T19:00:00Z",
    "stadium": "Toronto"
  },
  "group_J_m0": {
    "utcDate": "2026-06-17T01:00:00Z",
    "stadium": "Kansas City"
  },
  "group_J_m1": {
    "utcDate": "2026-06-17T04:00:00Z",
    "stadium": "San Francisco Bay Area (Santa Clara)"
  },
  "group_J_m2": {
    "utcDate": "2026-06-22T17:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "group_J_m3": {
    "utcDate": "2026-06-23T03:00:00Z",
    "stadium": "San Francisco Bay Area (Santa Clara)"
  },
  "group_J_m4": {
    "utcDate": "2026-06-28T02:00:00Z",
    "stadium": "Kansas City"
  },
  "group_J_m5": {
    "utcDate": "2026-06-28T02:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "group_K_m0": {
    "utcDate": "2026-06-17T17:00:00Z",
    "stadium": "Houston"
  },
  "group_K_m1": {
    "utcDate": "2026-06-18T02:00:00Z",
    "stadium": "Mexico City"
  },
  "group_K_m2": {
    "utcDate": "2026-06-23T17:00:00Z",
    "stadium": "Houston"
  },
  "group_K_m3": {
    "utcDate": "2026-06-24T02:00:00Z",
    "stadium": "Guadalajara (Zapopan)"
  },
  "group_K_m4": {
    "utcDate": "2026-06-27T23:30:00Z",
    "stadium": "Miami (Miami Gardens)"
  },
  "group_K_m5": {
    "utcDate": "2026-06-27T23:30:00Z",
    "stadium": "Atlanta"
  },
  "group_L_m0": {
    "utcDate": "2026-06-17T20:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "group_L_m1": {
    "utcDate": "2026-06-17T23:00:00Z",
    "stadium": "Toronto"
  },
  "group_L_m2": {
    "utcDate": "2026-06-23T20:00:00Z",
    "stadium": "Boston (Foxborough)"
  },
  "group_L_m3": {
    "utcDate": "2026-06-23T23:00:00Z",
    "stadium": "Toronto"
  },
  "group_L_m4": {
    "utcDate": "2026-06-27T21:00:00Z",
    "stadium": "New York/New Jersey (East Rutherford)"
  },
  "group_L_m5": {
    "utcDate": "2026-06-27T21:00:00Z",
    "stadium": "Philadelphia"
  },
  "r32_m0": {
    "utcDate": "2026-06-28T19:00:00Z",
    "stadium": "Los Angeles (Inglewood)"
  },
  "r32_m1": {
    "utcDate": "2026-06-29T17:00:00Z",
    "stadium": "Houston"
  },
  "r32_m2": {
    "utcDate": "2026-06-29T20:30:00Z",
    "stadium": "Boston (Foxborough)"
  },
  "r32_m3": {
    "utcDate": "2026-06-30T01:00:00Z",
    "stadium": "Monterrey (Guadalupe)"
  },
  "r32_m4": {
    "utcDate": "2026-06-30T17:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "r32_m5": {
    "utcDate": "2026-06-30T21:00:00Z",
    "stadium": "New York/New Jersey (East Rutherford)"
  },
  "r32_m6": {
    "utcDate": "2026-07-01T01:00:00Z",
    "stadium": "Mexico City"
  },
  "r32_m7": {
    "utcDate": "2026-07-01T16:00:00Z",
    "stadium": "Atlanta"
  },
  "r32_m8": {
    "utcDate": "2026-07-01T20:00:00Z",
    "stadium": "Seattle"
  },
  "r32_m9": {
    "utcDate": "2026-07-02T00:00:00Z",
    "stadium": "San Francisco Bay Area (Santa Clara)"
  },
  "r32_m10": {
    "utcDate": "2026-07-02T19:00:00Z",
    "stadium": "Los Angeles (Inglewood)"
  },
  "r32_m11": {
    "utcDate": "2026-07-02T23:00:00Z",
    "stadium": "Toronto"
  },
  "r32_m12": {
    "utcDate": "2026-07-03T03:00:00Z",
    "stadium": "Vancouver"
  },
  "r32_m13": {
    "utcDate": "2026-07-03T18:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "r32_m14": {
    "utcDate": "2026-07-03T22:00:00Z",
    "stadium": "Miami (Miami Gardens)"
  },
  "r32_m15": {
    "utcDate": "2026-07-04T01:30:00Z",
    "stadium": "Kansas City"
  },
  "r16_m0": {
    "utcDate": "2026-07-04T17:00:00Z",
    "stadium": "Houston"
  },
  "r16_m1": {
    "utcDate": "2026-07-04T21:00:00Z",
    "stadium": "Philadelphia"
  },
  "r16_m2": {
    "utcDate": "2026-07-05T20:00:00Z",
    "stadium": "New York/New Jersey (East Rutherford)"
  },
  "r16_m3": {
    "utcDate": "2026-07-06T00:00:00Z",
    "stadium": "Mexico City"
  },
  "r16_m4": {
    "utcDate": "2026-07-06T19:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "r16_m5": {
    "utcDate": "2026-07-07T00:00:00Z",
    "stadium": "Seattle"
  },
  "r16_m6": {
    "utcDate": "2026-07-07T16:00:00Z",
    "stadium": "Atlanta"
  },
  "r16_m7": {
    "utcDate": "2026-07-07T20:00:00Z",
    "stadium": "Vancouver"
  },
  "qf_m0": {
    "utcDate": "2026-07-09T20:00:00Z",
    "stadium": "Boston (Foxborough)"
  },
  "qf_m1": {
    "utcDate": "2026-07-10T19:00:00Z",
    "stadium": "Los Angeles (Inglewood)"
  },
  "qf_m2": {
    "utcDate": "2026-07-11T21:00:00Z",
    "stadium": "Miami (Miami Gardens)"
  },
  "qf_m3": {
    "utcDate": "2026-07-12T01:00:00Z",
    "stadium": "Kansas City"
  },
  "sf_m0": {
    "utcDate": "2026-07-14T19:00:00Z",
    "stadium": "Dallas (Arlington)"
  },
  "sf_m1": {
    "utcDate": "2026-07-15T19:00:00Z",
    "stadium": "Atlanta"
  },
  "final_m0": {
    "utcDate": "2026-07-18T21:00:00Z",
    "stadium": "Miami (Miami Gardens)"
  },
  "final_m1": {
    "utcDate": "2026-07-19T19:00:00Z",
    "stadium": "New York/New Jersey (East Rutherford)"
  }
};

