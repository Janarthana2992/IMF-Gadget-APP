// src/utils/codeGenerator.js

/**
 * Generate a random codename for a gadget
 * @returns {string} A random cool-sounding codename
 */
exports.generateCodename = () => {
    const adjectives = [
      'Phantom', 'Shadow', 'Swift', 'Silent', 'Covert', 'Nimble', 'Stealth', 
      'Ghost', 'Midnight', 'Phoenix', 'Raven', 'Onyx', 'Diamond', 'Emerald', 
      'Sapphire', 'Thunder', 'Eagle', 'Viper', 'Cobra', 'Crimson', 'Azure', 'Obsidian'
    ];
    
    const nouns = [
      'Hawk', 'Panther', 'Falcon', 'Wolf', 'Spectre', 'Dragon', 'Blade', 'Raptor',
      'Hunter', 'Sentinel', 'Guardian', 'Oracle', 'Reaper', 'Warrior', 'Knight',
      'Ninja', 'Enigma', 'Phoenix', 'Tempest', 'Serpent', 'Vigilant', 'Whisper'
    ];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${randomAdjective} ${randomNoun}`;
  };