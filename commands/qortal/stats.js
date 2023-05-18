const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Get Qortal stats & info.'),
	category: 'qortal',
	async execute(interaction) {
		let statistics = "";
    statistics += `__Qortal Stats & Info__\n\n`;

    const heightResponse = await request('https://api.qortal.org/blocks/height');
    const height = await heightResponse.body.json();
    statistics += `Block Height: ${height}\n`;

    const reward = 5-(Math.floor((height-1)/259200))*0.25;
    statistics += `Block Reward: ${reward} QORT\n`;

    //const coreResponse = await request('https://api.github.com/repos/Qortal/qortal/releases/latest');
    //const coreObject = await coreResponse.body.json();  // <--RETURNS SyntaxError: Unexpected token R in JSON at position 2
    //statistics += `Qortal Core: ${coreObject.tag_name}\n`;

    //const uiResponse = await request('https://api.github.com/repos/Qortal/qortal-ui/releases/latest');
    //const uiObject = await uiResponse.body.json();  // <--RETURNS SyntaxError: Unexpected token R in JSON at position 2
    //statistics += `Qortal UI: ${uiObject.tag_name}\n`;

    return interaction.reply({ content: `${statistics}` });
	},
};
