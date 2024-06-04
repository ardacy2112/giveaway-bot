const { SlashCommandBuilder, MessageActionRow, MessageButton } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cekilis')
    .setDescription('Çekiliş komutları')
    .addSubcommand(subcommand =>
      subcommand
        .setName('baslat')
        .setDescription('Yeni bir çekiliş başlat')
        .addStringOption(option => option.setName('süre').setDescription('Çekilişin süresi').setRequired(true))
        .addStringOption(option => option.setName('ödül').setDescription('Çekilişin ödülü').setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('bitir')
        .setDescription('Bir çekilişi bitir'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('rastgele-kazanan')
        .setDescription('Çekiliş için rastgele bir kazanan seç')),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'baslat':
        // Çekiliş başlatma kodları buraya
        const joinButton = new MessageButton()
          .setCustomId('cekilis-katil')
          .setLabel('Çekilişe Katıl!')
          .setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(joinButton);

        await interaction.reply({ content: 'Çekiliş başladı! Katılmak için aşağıdaki butona tıklayın.', components: [row] });
        break;
      case 'bitir':
        // Çekiliş bitirme kodları buraya
        break;
      case 'rastgele-kazanan':
        // Rastgele kazanan seçme kodları buraya
        break;
    }
  },
};
