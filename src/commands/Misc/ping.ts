import { ApplicationCommand, ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends ApplicationCommand {
  constructor(client: ShewenyClient) {
    super(
      client,
      {
        name: "ping",
        description: "Ping the bot",
      },
      {
        category: "Misc",
      }
    );
  }
  execute(interaction: CommandInteraction) {
    interaction.reply("Pong !");
  }
}