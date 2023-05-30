const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Get Qortal stats & info.'),
	category: 'qortal',
	async execute(interaction) {
    let height, reward, coreObject, uiObject;

    try {
      const heightResponse = await request('https://api.qortal.org/blocks/height');
      height = await heightResponse.body.json();
      reward = 5-(Math.floor((height-1)/259200))*0.25;
    } catch (error) {
      console.error(`Error fetching block height: ${error.message}`);
    }

    try {
      const coreResponse = await request('https://api.github.com/repos/Qortal/qortal/releases/latest', {
        headers: { 'User-Agent': 'qombot' },
      });
      coreObject = await coreResponse.body.json();
    } catch (error) {
      console.error(`Error fetching Core version: ${error.message}`);
    }

    try {
      const uiResponse = await request('https://api.github.com/repos/Qortal/qortal-ui/releases/latest', {
        headers: { 'User-Agent': 'qombot' },
      });
      uiObject = await uiResponse.body.json();
    } catch (error) {
      console.error(`Error fetching UI version: ${error.message}`);
    }

    const qortalStats = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Qortal Stats & Info')
      //.setURL('https://discord.js.org/')
      //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
      //.setDescription('Some description here')
      //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        { name: 'Block Height', value: height !== undefined ? JSON.stringify(height) : 'Unavailable', inline: true },
        { name: 'Block Reward', value: reward !== undefined ? `${reward} QORT` : 'Unavailable', inline: true },
        { name: '\u200b', value: '\u200b', inline: true }, // empty field for spacing
        { name: 'Core Version', value: coreObject !== undefined ? JSON.stringify(coreObject.tag_name).replace(/\"/g, '') : 'Unavailable', inline: true },
        { name: 'UI Version', value: uiObject !== undefined ? JSON.stringify(uiObject.tag_name).replace(/\"/g, '') : 'Unavailable', inline: true },
        { name: '\u200b', value: '\u200b', inline: true }, // empty field for spacing
	      )
	    //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	    //.setImage('https://i.imgur.com/AfFp7pu.png')
	    .setTimestamp();
	    //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return interaction.reply({ embeds: [qortalStats] });
	},
};
