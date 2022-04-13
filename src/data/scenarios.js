import achievements from './achievements';

export default [
    {
      id: 'multiplayer_Aethermaw',
      name: 'Aethermaw',
      type: 'Free-for-All',
      icon: '/images/crossed_sword_and_hammer.png',
      image: '/images/trow_story_06-Temple_in_the_Deep.jpg',
      description: 'Long ago, the Great Mage Sulla was imprisoned in the Aethermaw, a nexus of mystical energy whose chaotic nature was able to prevent her escape. Over the centuries, however, Sulla gradually attuned her powers to the maelstrom of disorder that is the Aethermaw, and has now begun to project its influence onto the material plane, drawing in entire regions of land from hundreds of different worlds, realities and time-periods. She experiments with these disparate pieces of the cosmos, manipulating them, merging them and sending them back and forth between the Aethermaw and their place of origin. Perhaps, as her mastery over the Aethermaw grows, Sulla will one day break free of its bonds. Until that time comes, she will continue to amuse herself by arranging battles between the mortal beings unlucky enough to be drawn into its depths. Designed by Doc Paterson.',
      players: 2,
      playerType: '1 vs 1',
      x: '-1000px',
      y: '-150px',
      start: 123,
      end: 123,
      achievements: [...achievements].map((a, i) => {
          return {...a, achieved: a.achieved = i < 3}
      })
    },
    {
      id: 'multiplayer_2p_Isle_of_Mists',
      name: 'Isle of Mists',
      type: 'Survival',
      icon: '/images/silver_buckler.png',
      image: '/images/trow_story_04-Fall_of_Eldaric.jpg',
      description: 'Isle of Mists is a Survival scenario which can be played alone or with another player against randomly spawned AI units, catered for experienced players. Victory is achieved by surviving and defeating all enemy waves. During the course of play, the terrain will change based on random weather effects. Default map settings are required for the scenario to work properly. By Lord-Knightmare.',
      players: 2,
      playerType: 'Cooperative',
      x: '-500px',
      y: '-850px',
      start: 600,
      end: 600,
      achievements: [
            {
                image: '/images/breastplate.png',
                achieved: true,
                name: 'Stalwart',
                description: 'Last 10 turns without losing a unit.'
            },
            {
                image: '/images/scroll_red.png',
                achieved: false,
                name: 'Medic',
                description: 'Heal a unit fully after it falls to 1 HP.'
            },
            {
                image: '/images/cloak_leather_brown.png',
                achieved: true,
                name: 'Survive 15 turns',
                description: 'Survive this scenario for 15 turns.'
            },
            {
                image: '/images/potion_green_medium.png',
                achieved: true,
                name: 'Survive 30 turns',
                description: 'Survive this scenario for 30 turns.'
            },
            {
                image: '/images/ring_gold.png',
                achieved: false,
                name: 'Survive 60 turns',
                description: 'Survive this scenario for 60 turns.'
            },
            {
              image: '/images/rusty_targ.png',
              achieved: true,
              name: 'Kill 100 enemies',
              description: 'Kill at least 100 enemies before your inevitable death.'
            },
            {
              image: '/images/sandals.png',
              achieved: true,
              name: 'Seize the Citadel',
              description: 'Move your leader to the citadel at the center of the map.'
            }
       ]
    },
    {
      id: 'multiplayer_Hamlets',
      name: 'Hamlets',
      type: 'Free-for-All',
      icon: '/images/crossed_sword_and_hammer.png',
      image: '/images/trow_story_06-Temple_in_the_Deep.jpg',
      description: 'Warfare transforms the simple farms and villages of a peaceful region into a subtly parceled battlefield. Designed by Doc Paterson.',
      players: 2,
      playerType: '1 vs 1',
      x: '-1300px',
      y: '-1010px',
      start: 351,
      end: 356,
      achievements: [...achievements].map((a, i) => {
          return {...a, achieved: a.achieved = i === 3}
      })
    },
    {
      id: 'multiplayer_3p_Morituri',
      name: 'Morituri',
      type: 'Free-for-All',
      icon: '/images/crossed_sword_and_hammer.png',
      image: '/images/trow_story_02-The_Fall.jpg',
      description: 'Only one faction will emerge victorious from this tightly bordered three-player map.',
      players: 3,
      playerType: 'Last Player Standing',
      x: '-800px',
      y: '-820px',
      start: 220,
      end: 245,
      achievements: [...achievements]
    },
    {
      id: 'multiplayer_A_New_Land',
      name: 'A New Land',
      type: 'Survival',
      icon: '/images/silver_buckler.png',
      image: '/images/trow_intro_01.jpg',
      description: `<p>This 4p Survival scenario allows you to construct buildings and terraform the land.</p>
<p>For experienced players, it's recommended to lower the starting gold to 75.</p>`,
      players: 4,
      playerType: 'Cooperative',
      x: '-1400px',
      y: '-450px',
      start: 105,
      end: 203,
      achievements: [
        {
            image: '/images/breastplate.png',
            achieved: true,
            name: 'Stalwart',
            description: 'Last 10 turns without losing a unit.'
        },
        {
            image: '/images/scroll_red.png',
            achieved: false,
            name: 'Medic',
            description: 'Heal a unit fully after it falls to 1 HP.'
        },
        {
            image: '/images/cloak_leather_brown.png',
            achieved: true,
            name: 'Survive 15 turns',
            description: 'Survive this scenario for 15 turns.'
        },
        {
            image: '/images/potion_green_medium.png',
            achieved: true,
            name: 'Survive 30 turns',
            description: 'Survive this scenario for 30 turns.'
        },
        {
            image: '/images/ring_gold.png',
            achieved: false,
            name: 'Survive 60 turns',
            description: 'Survive this scenario for 60 turns.'
        },
        {
          image: '/images/rusty_targ.png',
          achieved: true,
          name: 'Kill 100 enemies',
          description: 'Kill at least 100 enemies before your inevitable death.'
        },
        {
          image: '/images/sandals.png',
          achieved: true,
          name: 'Seize the Citadel',
          description: 'Move your leader to the citadel at the center of the map.'
        }
      ]
    },
    {
      id: 'multiplayer_Loris_River',
      name: 'Loris River',
      type: 'Free-for-All',
      icon: '/images/crossed_sword_and_hammer.png',
      image: '/images/trow_story_06-Temple_in_the_Deep.jpg',
      description: '2 vs. 2 map centered around a river with keeps in opposite corners. Designed for players 1 &amp; 4 vs. 2 &amp; 3. There are 28 villages.',
      players: 4,
      playerType: '2 vs 2',
      x: '-1000px',
      y: '-2200px',
      start: 110,
      end: 110,
      achievements: [...achievements]
    },
    {
      id: 'multiplayer_The_Wilderlands',
      name: 'The Wilderlands',
      type: 'Free-for-All',
      icon: '/images/crossed_sword_and_hammer.png',
      image: '/images/trow_story_02-The_Fall.jpg',
      description: 'A vast region of wild, untamed wilderness, its terrain dotted with forests, caves, rivers, and the ruins of ancient fortresses.',
      players: 4,
      playerType: 'Last Player Standing',
      x: '-1200px',
      y: '-200px',
      start: 671,
      end: 672,
      achievements: [...achievements]
    },
];