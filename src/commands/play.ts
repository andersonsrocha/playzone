import { Player, PlayerOptions, QueryType } from "discord-player";
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";

const queueOptions: PlayerOptions = {
  ytdlOptions: {
    quality: "highest",
    filter: "audioonly",
    highWaterMark: 1 << 30,
    dlChunkSize: 0,
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song in your channel! 🎵")
    .addSubcommand((command) =>
      command
        .setName("search")
        .setDescription("Searchs for a song and play it! 🎵")
        .addStringOption((opt) =>
          opt.setName("query").setDescription("Search keywords").setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("playlist")
        .setDescription("Plays a playlist! 🎵")
        .addStringOption((opt) =>
          opt.setName("url").setDescription("The playlist's url").setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("song")
        .setDescription("Plays a single song! 🎵")
        .addStringOption((opt) =>
          opt.setName("url").setDescription("The song's url!").setRequired(true)
        )
    ),
  async execute(interaction: ChatInputCommandInteraction, player: Player) {
    if (!(interaction.member instanceof GuildMember)) return;

    if (!interaction.member.voice.channel) {
      await interaction.reply("You must be in a voice channel to use this command.");
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const queue = player.createQueue(interaction.guild!, queueOptions);

    if (!queue.connection) await queue.connect(interaction.member.voice.channel);

    const embed = new EmbedBuilder();
    if (interaction.options.getSubcommand() === "song") {
      const query = interaction.options.getString("url");
      if (!query) {
        await interaction.editReply("URL param is required.");
        return;
      }

      const result = await player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
      });

      if (result.tracks.length === 0) {
        await interaction.editReply("No results found.");
        return;
      }

      const song = result.tracks[0];
      queue.addTrack(song);

      embed
        .setDescription(`Added **[${song.title}](${song.url})** to the queue.`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` });
    } else if (interaction.options.getSubcommand() === "search") {
      const query = interaction.options.getString("query");
      if (!query) {
        await interaction.editReply("Search param is required.");
        return;
      }

      const result = await player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_SEARCH,
      });

      if (result.tracks.length === 0) {
        await interaction.editReply("No results found.");
        return;
      }

      const song = result.tracks[0];
      queue.addTrack(song);

      embed
        .setDescription(`Added **[${song.title}](${song.url})** to the queue.`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` });
    } else if (interaction.options.getSubcommand() === "playlist") {
      const query = interaction.options.getString("url");
      if (!query) {
        await interaction.editReply("URL param is required.");
        return;
      }

      const result = await player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST,
      });

      if (!result.playlist || result.tracks.length === 0) {
        await interaction.editReply("No results found.");
        return;
      }

      const first = result.tracks[0];
      queue.addTracks(result.tracks);

      embed
        .setDescription(
          `Added **[${first.title}](${first.url})** and **more ${result.tracks.length}** to the queue.`
        )
        .setThumbnail(first.thumbnail);
    }

    // play song
    if (!queue.playing) await queue.play();
    // respond
    await interaction.followUp({ embeds: [embed], ephemeral: true });
  },
};
