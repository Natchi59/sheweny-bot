import { Command, ShewenyClient } from "sheweny";
import { User } from "discord.js";
import type { CommandInteraction } from "discord.js";
import { embedMod, sendLogChannel } from "../../utils";

export class UnbanCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "unban",
      description: "Unban user in the guild",
      type: "SLASH_COMMAND",
      category: "Moderation",
      options: [
        {
          name: "user",
          type: "STRING",
          description: "The user to unban",
          required: true,
        },
      ],
      userPermissions: ["MANAGE_GUILD"],
      clientPermissions: ["BAN_MEMBERS"],
    });
  }
  async execute(interaction: CommandInteraction) {
    try {
      const user = (await this.client.util.resolveUser(
        interaction.options.getString("user", true)
      )) as User;
      if (!user)
        return interaction.reply({
          content: `${this.client.config.emojis.error} User not found.`,
          ephemeral: true,
        });

      await interaction.guild!.members.unban(user);

      const embed = embedMod(
        user,
        interaction.user,
        this.client.config.colors.green,
        "unban"
      );
      await interaction.reply({ embeds: [embed], ephemeral: true });

      sendLogChannel(this.client, interaction, { embeds: [embed] });
    } catch (e: any) {
      console.log(e);

      if (e.message.match("Unknown User"))
        return interaction.reply({
          content: `${this.client.config.emojis.error} User not found.`,
          ephemeral: true,
        });
      else
        return interaction.reply({
          content: `${this.client.config.emojis.error} An error has occurred. Please try again.`,
          ephemeral: true,
        });
    }
  }
}
