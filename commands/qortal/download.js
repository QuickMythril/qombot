const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

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
          { name: 'Qortal Core', value: 'https://github.com/qortal/qortal/releases/latest' },
          { name: 'Qortal UI', value: 'https://github.com/qortal/qortal-ui/releases/latest' },
          { name: 'Apt Repo', value: '<https://github.com/Qortal/qortal-ui/blob/master/scripts/add-debian-apt-repo.sh#L22>' },
        )),
	category: 'qortal',
	async execute(interaction) {
    const pagelink = interaction.options.getString('type') ?? 'https://qortal.org/downloads';
		return interaction.reply({ content: `${pagelink}` });
	},
};
