import { Player } from "discord-player";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current song! ⏭️"),
  async execute(interaction: ChatInputCommandInteraction, player: Player) {
    const queue = player.getQueue(interaction.guildId!);
    if (!queue) {
      await interaction.reply("No music is playing now! 🔇");
      return;
    }
    // current
    const current = queue.current;
    // skip
    queue.skip();
    // message
    const embed = new EmbedBuilder()
      .setThumbnail(current.thumbnail)
      .setDescription(`${current.title} has been skipped!`);
    // respond
    await interaction.reply({ embeds: [embed] });
  },
};
