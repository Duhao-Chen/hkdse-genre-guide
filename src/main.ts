/// <reference types="@workadventure/iframe-api-typings" />

/**
 * Minimal test bot — matches bot-starter-kit exactly.
 * If this loads and greets, the format is correct.
 */

export default {
  run: async () => {
    console.log("Bot script loaded");

    await WA.onInit();
    console.log("WA.onInit complete");

    await WA.players.configureTracking({ players: true, movement: false });

    WA.player.proximityMeeting.onJoin().subscribe(async () => {
      console.log("Player entered bubble");
      await WA.chat.sendChatMessage("Hello! I'm Miss Wong. This is a test.", {
        scope: "bubble",
      });
    });

    WA.chat.onChatMessage((msg: string, event: any) => {
      if (!event?.author) return;
      WA.chat.sendChatMessage("I heard you say: " + msg, {
        scope: "bubble",
      });
    }, { scope: "bubble" });

    console.log("Bot ready");
  },
};
