import { Player, QueueRepeatMode } from "discord-player";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Define loop mode! 🔁")
    .addSubcommand((command) => command.setName("off").setDescription("Repeat mode off. 🚫"))
    .addSubcommand((command) =>
      command.setName("song").setDescription("Current song is on repeat mode. 🔂")
    )
    .addSubcommand((command) =>
      command.setName("queue").setDescription("Current queue is in retry mode. 🔁")
    ),
  async execute(interaction: ChatInputCommandInteraction, player: Player) {
    const queue = player.getQueue(interaction.guildId!);
    if (!queue) {
      await interaction.reply("No music is playing now! 🔇");
      return;
    }

    let message = "";
    if (!interaction.options || interaction.options.getSubcommand() === "song") {
      queue.setRepeatMode(QueueRepeatMode.TRACK);
      message = "Current song is on repeat mode. 🔂";
    } else if (interaction.options.getSubcommand() === "off") {
      queue.setRepeatMode(QueueRepeatMode.OFF);
      message = "Repeat mode off. 🚫";
    } else if (interaction.options.getSubcommand() === "queue") {
      queue.setRepeatMode(QueueRepeatMode.QUEUE);
      message = "Current queue is in retry mode. 🔁";
    }

    // respond
    await interaction.reply(message);
  },
};
