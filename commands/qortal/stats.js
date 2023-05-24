const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Get Qortal stats & info.'),
	category: 'qortal',
	async execute(interaction) {

    const heightResponse = await request('https://api.qortal.org/blocks/height');
    const height = await heightResponse.body.json();
    const reward = 5-(Math.floor((height-1)/259200))*0.25;

    const coreResponse = await request('https://api.github.com/repos/Qortal/qortal/releases/latest', {
      headers: { 'User-Agent': 'qombot' },
    });
    const coreObject = await coreResponse.body.json();

    const uiResponse = await request('https://api.github.com/repos/Qortal/qortal-ui/releases/latest', {
      headers: { 'User-Agent': 'qombot' },
    });
    const uiObject = await uiResponse.body.json();

    const qortalStats = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Qortal Stats & Info')
      //.setURL('https://discord.js.org/')
      //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
      //.setDescription('Some description here')
      //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        { name: 'Block Height', value: JSON.stringify(height), inline: true },
        { name: 'Block Reward', value: `${reward} QORT`, inline: true },
        { name: '\u200b', value: '\u200b', inline: true }, // empty field for spacing
        { name: 'Core Version', value: JSON.stringify(coreObject.tag_name).replace(/"/g, ''), inline: true },
        { name: 'UI Version', value: JSON.stringify(uiObject.tag_name).replace(/"/g, ''), inline: true },
        { name: '\u200b', value: '\u200b', inline: true }, // empty field for spacing
	      )
	    //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	    //.setImage('https://i.imgur.com/AfFp7pu.png')
	    .setTimestamp();
	    //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return interaction.reply({ embeds: [qortalStats] });
	},
};
