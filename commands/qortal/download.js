const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('download')
		.setDescription('Get Qortal Download links.')
    .addStringOption(option =>
      option.setName('type')
        .setDescription('The Download type to link')
        .setRequired(false)
        .addChoices(
          // maximum 25 choices
          { name: 'Qortal Core', value: 'https://github.com/Qortal/qortal/releases/latest' },
          { name: 'Zip', value: 'https://github.com/Qortal/qortal/releases/latest/download/qortal.zip' },
          { name: 'Exe', value: 'https://github.com/Qortal/qortal/releases/latest/download/qortal.exe' },
          { name: 'Jar', value: 'https://github.com/Qortal/qortal/releases/latest/download/qortal.jar' },
          { name: 'Qortal UI', value: 'https://github.com/Qortal/qortal-ui/releases/latest' },
          { name: 'Linux', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.AppImage' },
          { name: 'Mac', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-macOS.dmg' },
          { name: 'Windows', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-win64.exe' },
          { name: 'Deb', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.deb' },
          { name: 'Rpm', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.rpm' },
          { name: 'Snap', value: 'https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.snap' },
          { name: 'Apt', value: '<https://github.com/Qortal/qortal-ui/blob/master/scripts/add-debian-apt-repo.sh#L24-L28>' },
        )),
	category: 'qortal',
	async execute(interaction) {
    const pagelink = interaction.options.getString('type') ?? 'none';
    if (pagelink === 'none') {
      const coreMain = new ButtonBuilder()
			  .setURL('https://github.com/Qortal/qortal/releases/latest')
			  .setLabel('Qortal Core')
			  .setStyle(ButtonStyle.Link);
      const coreZip = new ButtonBuilder()
			  .setURL('https://github.com/Qortal/qortal/releases/latest/download/qortal.zip')
			  .setLabel('Linux/Mac (zip)')
			  .setStyle(ButtonStyle.Link);
      const coreExe = new ButtonBuilder()
        .setURL('https://github.com/Qortal/qortal/releases/latest/download/qortal.exe')
			  .setLabel('Win (exe)')
        .setStyle(ButtonStyle.Link);
      const coreJar = new ButtonBuilder()
        .setURL('https://github.com/Qortal/qortal/releases/latest/download/qortal.jar')
			  .setLabel('Jar File')
        .setStyle(ButtonStyle.Link);
      const coreRow = new ActionRowBuilder()
			  .addComponents(coreMain, coreZip, coreExe, coreJar);

      const uiMain = new ButtonBuilder()
			  .setURL('https://github.com/Qortal/qortal-ui/releases/latest')
			  .setLabel('Qortal UI')
			  .setStyle(ButtonStyle.Link);
      const uiLinux = new ButtonBuilder()
			  .setURL('https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.AppImage')
			  .setLabel('Linux (AppImage)')
			  .setStyle(ButtonStyle.Link);
      const uiMac = new ButtonBuilder()
        .setURL('https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-macOS.dmg')
			  .setLabel('Mac (dmg)')
        .setStyle(ButtonStyle.Link);
      const uiWin = new ButtonBuilder()
        .setURL('https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-win64.exe')
			  .setLabel('Win (exe)')
        .setStyle(ButtonStyle.Link);
      const uiRow = new ActionRowBuilder()
			  .addComponents(uiMain, uiLinux, uiMac, uiWin);

      const uiDeb = new ButtonBuilder()
			  .setURL('https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.deb')
			  .setLabel('Debian Package')
			  .setStyle(ButtonStyle.Link);
      const uiRpm = new ButtonBuilder()
			  .setURL('https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.rpm')
			  .setLabel('RPM Package')
			  .setStyle(ButtonStyle.Link);
      const uiSnap = new ButtonBuilder()
        .setURL('https://github.com/Qortal/qortal-ui/releases/latest/download/Qortal-Setup-amd64.snap')
			  .setLabel('Snap Package')
        .setStyle(ButtonStyle.Link);
      const uiApt = new ButtonBuilder()
        .setURL('https://github.com/Qortal/qortal-ui/blob/master/scripts/add-debian-apt-repo.sh#L24-L28')
			  .setLabel('Apt Repo Info')
        .setStyle(ButtonStyle.Link);
      const uiRow2 = new ActionRowBuilder()
			  .addComponents(uiDeb, uiRpm, uiSnap, uiApt);

      return interaction.reply({ content: 'Qortal Core & UI Downloads', components: [coreRow, uiRow, uiRow2] });
    } else {
		  return interaction.reply({ content: `${pagelink}` });
    }
	},
};
