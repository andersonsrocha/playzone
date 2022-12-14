import { Player } from "discord-player";
import Discord, {
  ActivityType,
  EmbedBuilder,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
  TextBasedChannel,
  MessageActionRowComponentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Emoji,
} from "discord.js";
import env from "dotenv";
import fs from "fs";

import { Client } from "@client";

env.config();

const { TOKEN = "", CLIENT_ID = "" } = process.env;

const client = new Client();
client.commands = new Discord.Collection();

// slashCommandHandling
const commands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];
const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

const player = new Player(client);

// player events
player.on("error", ({ metadata }, error) => {
  (metadata as TextBasedChannel)?.send(`An error has occurred: ${error.message}`);
});

player.on("connectionError", function ({ metadata }, error) {
  (metadata as TextBasedChannel)?.send(`An error has occurred: ${error.message}`);
});

player.on("trackStart", ({ metadata }, track) => {
  const embed = new EmbedBuilder()
    .setDescription(`**[${track.title}](${track.url})** is playing now.`)
    .setThumbnail(track.thumbnail)
    .setFooter({ text: `Duration: ${track.duration}` });
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("prev")
      .setLabel("Prev")
      .setEmoji("⏮️")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("loop")
      .setLabel("Loop")
      .setEmoji("🔂")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("resume")
      .setLabel("Play")
      .setEmoji("▶️")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId("pause")
      .setLabel("Pause")
      .setEmoji("⏸️")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("skip")
      .setLabel("Next")
      .setEmoji("⏭️")
      .setStyle(ButtonStyle.Secondary)
  );

  (metadata as TextBasedChannel)?.send({ embeds: [embed], components: [row] });
});

player.on("botDisconnect", ({ metadata }) => {
  (metadata as TextBasedChannel)?.send("They sent me away, I'm going... 🥲");
});

player.on("channelEmpty", ({ metadata }) => {
  (metadata as TextBasedChannel)?.send("Everyone left the voice channel, I'm leaving... 🙃");
});

player.on("queueEnd", ({ metadata }) => {
  (metadata as TextBasedChannel)?.send("I finished all the songs, shall we add more? 😎");
});

// client events
client.on("ready", function (client) {
  const rest = new REST({ version: "10" }).setToken(TOKEN);
  rest
    .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => console.log("Estou on! ✨"))
    .catch(console.error);

  client.user.setActivity("music | /help", { type: ActivityType.Playing });
});

client.on("interactionCreate", async (interaction) => {
  if (!(interaction.isCommand() || interaction.isButton())) return;

  const commandName = interaction.isCommand() ? interaction.commandName : interaction.customId;
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(interaction, player);
  } catch (err) {
    console.error(err);
    await interaction.reply("An error occurred while executing that command.");
  }
});

// client login
client.login(TOKEN);
