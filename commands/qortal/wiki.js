const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('wiki')
		.setDescription('Get Qortal Wiki links.')
    .addStringOption(option =>
      option.setName('keyword')
        .setDescription('The Wiki page to link')
        //.setRequired(true)
        .addChoices(
          // maximum 25 choices
          { name: 'Settings', value: 'how_to_edit_qortal_core_settings' },
          { name: 'DevFund', value: 'donations' },
        )),
	category: 'qortal',
	async execute(interaction) {
    const page = interaction.options.getString('keyword') ?? 'home';
		const wikilink = "https://wiki.qortal.org/doku.php?id=" + page;
    return interaction.reply({ content: `${wikilink}` });
	},
};
