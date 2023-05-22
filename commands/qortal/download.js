const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('download')
		.setDescription('Get Qortal Download links.')
    .addStringOption(option =>
      option.setName('type')
        .setDescription('The Download type to link')
        //.setRequired(true)
        .addChoices(
          // maximum 25 choices
          { name: 'Linux', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.AppImage' },
          { name: 'Mac', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-macOS.dmg' },
          { name: 'Windows', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-win64.exe' },
          { name: 'Core', value: 'https://github.com/qortal/qortal/releases/latest' },
          { name: 'UI', value: 'https://github.com/qortal/qortal-ui/releases/latest' },
          { name: 'Jar', value: 'https://github.com/Qortal/qortal/releases/latest/download/qortal.jar' },
          { name: 'Apt', value: '<https://github.com/Qortal/qortal-ui/blob/master/scripts/add-debian-apt-repo.sh#L22>' },
        )),
	category: 'qortal',
	async execute(interaction) {
    const pagelink = interaction.options.getString('type') ?? 'https://qortal.org/downloads';
		return interaction.reply({ content: `${pagelink}` });
	},
};
