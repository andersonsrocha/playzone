import { Player } from "discord-player";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("prev").setDescription("Back to previous song! ⏮️"),
  async execute(interaction: ChatInputCommandInteraction, player: Player) {
    const queue = player.getQueue(interaction.guildId!);
    if (!queue) {
      await interaction.reply("No music is playing now! 🔇");
      return;
    }
    // back
    queue.back();
    // current
    const current = queue.current;
    // message
    const embed = new EmbedBuilder()
      .setThumbnail(current.thumbnail)
      .setDescription(`${current.title} has been returned!`);
    // respond
    await interaction.reply({ embeds: [embed] });
  },
};
