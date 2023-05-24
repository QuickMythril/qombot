const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Get Qortal Invite links.')
    .addStringOption(option =>
      option.setName('type')
        .setDescription('The Invite type to link')
        .setRequired(false)
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
    const pagelink = interaction.options.getString('type') ?? 'none';
		if (pagelink === 'none') {
      const dMain = new ButtonBuilder()
			  .setURL('https://discord.com/invite/54UyhB7')
			  .setLabel('Main Discord')
			  .setStyle(ButtonStyle.Link);
      const dMarketing = new ButtonBuilder()
			  .setURL('https://discord.gg/Vcam9HHNBz')
			  .setLabel('Marketing')
			  .setStyle(ButtonStyle.Link);
      const dQapps = new ButtonBuilder()
        .setURL('https://discord.gg/tqnpDMfuR2')
			  .setLabel('Q-App Devs')
        .setStyle(ButtonStyle.Link);
      const dRow = new ActionRowBuilder()
			  .addComponents(dMain, dMarketing, dQapps);

      const tMain = new ButtonBuilder()
			  .setURL('https://t.me/qortal_official')
			  .setLabel('Main Telegram')
        .setStyle(ButtonStyle.Link);
      const tSupport = new ButtonBuilder()
			  .setURL('https://t.me/qortalchat')
			  .setLabel('Tech Support')
			  .setStyle(ButtonStyle.Link);
      const tOfftopic = new ButtonBuilder()
        .setURL('https://t.me/qortalofftopic')
        .setLabel('Off-Topic')
        .setStyle(ButtonStyle.Link);
      const tRow = new ActionRowBuilder()
			  .addComponents(tMain, tSupport, tOfftopic);

      const thinkTank = new ButtonBuilder()
        .setURL('https://cloud.qortal.org/call/2oxmnpke')
        .setLabel('Qortal Think Tank')
        .setStyle(ButtonStyle.Link);
      const ttRow = new ActionRowBuilder()
			  .addComponents(thinkTank);

      return interaction.reply({ content: 'Discord & Telegram Links', components: [dRow, tRow, ttRow] });
    } else {
      return interaction.reply({ content: `${pagelink}` });
    }
	},
};
