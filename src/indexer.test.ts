import { describe, it } from "vitest";
import { createTestIndexer, type NFTFaxCollectibleV2_FaxMinted } from "envio";
import { TestHelpers } from "envio";

describe("NFTFaxCollectibleV2 contract FaxMinted event tests", () => {
  it("NFTFaxCollectibleV2_FaxMinted is created correctly", async (t) => {
    const indexer = createTestIndexer();

    // Creating mock for NFTFaxCollectibleV2 contract FaxMinted event
    const event = {
      contract: "NFTFaxCollectibleV2" as const,
      event: "FaxMinted" as const,
      params: {
        mintedTokenId: 1n,
        to: TestHelpers.Addresses.defaultAddress,
        community: 1n,
        sourceTokenId: 0n,
        trayId: "abc123def456",
      },
    };

    await indexer.process({
      chains: {
        8453: {
          simulate: [event],
        },
      },
    });

    // Getting the actual entity from the test indexer
    const allEntities = await indexer.NFTFaxCollectibleV2_FaxMinted.getAll();
    const actualNFTFaxCollectibleV2FaxMinted = allEntities[0];

    // Creating the expected entity
    const expectedNFTFaxCollectibleV2FaxMinted = {
      id: actualNFTFaxCollectibleV2FaxMinted?.id,
      mintedTokenId: event.params.mintedTokenId,
      to: event.params.to,
      community: event.params.community,
      sourceTokenId: event.params.sourceTokenId,
      trayId: event.params.trayId,
      blockNumber: actualNFTFaxCollectibleV2FaxMinted?.blockNumber,
      blockTimestamp: actualNFTFaxCollectibleV2FaxMinted?.blockTimestamp,
      transactionHash: actualNFTFaxCollectibleV2FaxMinted?.transactionHash,
      chainId: 8453,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    t.expect(actualNFTFaxCollectibleV2FaxMinted, "Actual NFTFaxCollectibleV2FaxMinted should be the same as the expected NFTFaxCollectibleV2FaxMinted").toEqual(expectedNFTFaxCollectibleV2FaxMinted);
  });
});

describe("Indexer smoke test", () => {
  it("processes the first block with events on chain 8453", async (t) => {
    const indexer = createTestIndexer();

    const result = await indexer.process({ chains: { 8453: {} } });

    t.expect(result.changes.length, "Should have at least one change").toBeGreaterThan(0);
    const firstChange = result.changes[0]!;
    t.expect(firstChange.chainId).toBe(8453);
    t.expect(firstChange.eventsProcessed).toBeGreaterThan(0);
  }, 60_000);
});
