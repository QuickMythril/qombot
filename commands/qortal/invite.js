const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Get Qortal Invite links.')
    .addStringOption(option =>
      option.setName('type')
        .setDescription('The Invite type to link')
        .setRequired(true)
        .addChoices(
          // maximum 25 choices
          { name: 'Main Discord', value: 'https://discord.com/invite/54UyhB7' },
          { name: 'Marketing Discord', value: 'https://discord.gg/Vcam9HHNBz' },
          { name: 'Q-App Discord', value: 'https://discord.gg/tqnpDMfuR2' },
          { name: 'Main Telegram', value: 'https://t.me/qortal_official' },
          { name: 'Support Telegram', value: 'https://t.me/qortalchat' },
          { name: 'Off-Topic Telegram', value: 'https://t.me/qortalofftopic' },
          { name: 'Think Tank', value: 'Think Tank - https://cloud.qortal.org/call/2oxmnpke' }, // **Qortal Think Tank** (Weekly Community Voice Chat)\nTuesdays at 1PM Eastern / 10AM Pacific\n
        )),
	category: 'qortal',
	async execute(interaction) {
    const pagelink = interaction.options.getString('type');
		return interaction.reply({ content: `${pagelink}` });
	},
};
