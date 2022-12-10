import { Player } from "discord-player";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Kick the bot from the channel! 🔇"),
  async execute(interaction: ChatInputCommandInteraction, player: Player) {
    const queue = player.getQueue(interaction.guildId!);
    if (!queue) {
      await interaction.reply("No music is playing now! 🔇");
      return;
    }

    // destroy
    queue.destroy();
    // respond
    await interaction.reply("Why did you do this to me? 😢");
  },
};
