/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { indexer } from "envio";
import type { NFTFaxCollectibleV2_FaxMinted } from "envio";

indexer.onEvent({ contract: "NFTFaxCollectibleV2", event: "FaxMinted" }, async ({ event, context }) => {
  const entity: NFTFaxCollectibleV2_FaxMinted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    mintedTokenId: event.params.mintedTokenId,
    to: event.params.to,
    community: event.params.community,
    sourceTokenId: event.params.sourceTokenId,
    trayId: event.params.trayId,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
  };

  context.NFTFaxCollectibleV2_FaxMinted.set(entity);
});
