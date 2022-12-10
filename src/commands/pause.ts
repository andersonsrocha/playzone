import { Player } from "discord-player";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("pause").setDescription("Pauses the current song! ⏸️"),
  async execute(interaction: ChatInputCommandInteraction, player: Player) {
    const queue = player.getQueue(interaction.guildId!);
    if (!queue) {
      await interaction.reply("No music is playing now! 🔇");
      return;
    }

    // pause
    queue.setPaused(true);
    // respond
    await interaction.reply("Song has been paused. ⏸️");
  },
};
