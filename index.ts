import { Player } from "discord-player";
import Discord, { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
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
player.on("error", (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});

player.on("connectionError", function (queue, error) {
  console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});

// client events
client.on("ready", function (client) {
  const guilds = client.guilds.cache.map((guild) => guild.id);

  const rest = new REST({ version: "9" }).setToken(TOKEN);
  const requests = [];
  for (const id of guilds) {
    requests.push(
      rest
        .put(Routes.applicationGuildCommands(CLIENT_ID, id), { body: commands })
        .then(() => console.log(`Added commands to ${id}`))
        .catch(console.error)
    );
  }

  Promise.all(requests).then(() => console.log("Estou on! ✨"));
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
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
