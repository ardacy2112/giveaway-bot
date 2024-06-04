const { Client, Intents } = require('discord.js');
const fs = require('fs');

// Botunuzun token'ını .env dosyasından yükleyin
require('dotenv').config();

// Yeni bir Discord istemcisi oluşturun ve gerekli niyetleri belirtin
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Map();

// 'commands' klasöründeki tüm komut dosyalarını yükleyin
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Komut adını ve dosyasını komutlar map'ine ekleyin
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`${client.user.tag} olarak giriş yapıldı!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Bu komutu çalıştırırken bir hata oluştu!', ephemeral: true });
  }
});

// Botunuzu Discord'a bağlayın
client.login(process.env.DISCORD_TOKEN);
