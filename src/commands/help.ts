import { Client } from "@client";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Show list of commands! 📋"),
  async execute(interaction: ChatInputCommandInteraction) {
    // client
    const client = interaction.client as Client;
    // list
    const list: Array<string> = [];
    // get commands
    for (const [, command] of client.commands) {
      list.push(`**/${command.data.name}**: ${command.data.description}`);
    }
    // message
    const embed = new EmbedBuilder()
      .setTitle("**Help**")
      .setDescription(list.join("\n\n"))
      .setFooter({ text: "\nDo /<command> for more information about the command!" });
    // respond
    await interaction.reply({ embeds: [embed] });
  },
};
