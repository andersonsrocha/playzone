import { Player } from "discord-player";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("resume").setDescription("Resumes the current song! 🎵"),
  async execute(interaction: ChatInputCommandInteraction, player: Player) {
    const queue = player.getQueue(interaction.guildId!);
    if (!queue) {
      await interaction.reply("No music is playing now! 🔇");
      return;
    }

    // pause
    queue.setPaused(false);
    // respond
    await interaction.reply("Song has been resumed. ▶️");
  },
};
