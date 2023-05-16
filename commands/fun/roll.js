const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a die!')
        .addIntegerOption(option => option.setName('sides').setDescription('Number of sides on the die'))
        .addIntegerOption(option => option.setName('dice').setDescription('Number of dice to roll')),
	category: 'fun',
	async execute(interaction) {
		const sides = interaction.options.getInteger('sides');
        const dice = interaction.options.getInteger('dice');

		if (dice < 1 || dice > 10) {
			return interaction.reply({ content: 'You need to input a number between 1 and 10.', ephemeral: true });
		}
        if (sides < 2 || sides > 100) {
			return interaction.reply({ content: 'You need to input a number between 2 and 100.', ephemeral: true });
		}
        const results = [];
        for (let i = 0; i < dice; i++) {
            const result = Math.floor(Math.random() * sides) + 1;
            results.push(result);
        }

        return interaction.reply({ content: `You rolled \`${results.join(', ')}\` on \`${dice}\` \`${sides}\`-sided dice` });
	},
};
