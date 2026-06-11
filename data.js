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
    { id: 'final', name: 'Final', matches: 1 }
  ]
};
