import { Player } from "discord-player";
import { CacheType, Interaction, SlashCommandBuilder, TextChannel } from "discord.js";

export type METADATA = {
  channel: TextChannel;
};

export type COMMAND = {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction<CacheType>, player: Player) => Promise<void>;
};
