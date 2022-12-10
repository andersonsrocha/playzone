import { Player, Track } from "discord-player";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show first 10 songs in the queue! 📋"),
  async execute(interaction: ChatInputCommandInteraction, player: Player) {
    const queue = player.getQueue(interaction.guildId!);
    if (!queue) {
      await interaction.reply("No music is playing now! 🔇");
      return;
    }
    // map function
    const mapper = (song: Track, i?: number) =>
      `${i ? i + ". " : ""}[${song.duration}] ${song.title} - <@${song.requestedBy.id}>`;
    // get first 10
    const list = queue.tracks.slice(0, 10).map(mapper).join("\n");
    // get current song
    const current = queue.current;
    // message
    const embed = new EmbedBuilder()
      .setThumbnail(current.thumbnail)
      .setDescription(
        `**Currently Playing**\n ${current ? mapper(current) : "none"}\n\n**Queue**\n${list}`
      );
    // respond
    await interaction.reply({ embeds: [embed] });
  },
};
