import { Client as BaseClient, Collection } from "discord.js";

import { COMMAND } from "@types";

export class Client extends BaseClient {
  public commands: Collection<unknown, COMMAND>;

  constructor() {
    super({
      intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
    });

    this.commands = new Collection();
  }
}
