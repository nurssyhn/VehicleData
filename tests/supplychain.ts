
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SupplyChain, VehicleData } from "../target/types/supply-chain";
import { Keypair, SystemProgram } from "@solana/web3.js";
import assert from "assert";


describe("supply_chain", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet = provider.wallet as anchor.Wallet;
  const connection = provider.connection;

  const program = anchor.workspace.supply_chain as Program<SupplyChain>;

  it("initialize VehicleData", async () => {
    const vehicleDataKp = new Keypair();
    const plate = "UNX1005";
    const timeOfJourney = new anchor.BN(60); // 1 hour in
    const temperature = new anchor.BN(25); // 25 degrees Celsius

    const vehicleData = await program.account.vehicleData.fetch(vehicleDataKp.publicKey) as VehicleData;
    assert.equal(vehicleData.plate, plate);
    assert.equal(vehicleData.timeOfJourney.toNumber(), timeOfJourney.toNumber());
    assert.equal(vehicleData.temperature.toNumber(), temperature.toNumber());
  });

  it("update VehicleData", async () => {
    const vehicleDataKp = new Keypair();
    const plate = "UNX2501";
    const timeOfJourney = new anchor.BN(7200); // 2 hours in seconds
    const temperature = new anchor.BN(30); // 30 degrees Celsius


    await program.methods
      .updateData(plate, timeOfJourney, temperature)
      .accounts({
        vehicleData: vehicleDataKp.publicKey,
        user: wallet.publicKey,
      })
      .rpc();

    const updatedVehicleData = await program.account.vehicleData.fetch(vehicleDataKp.publicKey) as VehicleData;
    assert.equal(updatedVehicleData.plate, plate);
    assert.equal(updatedVehicleData.timeOfJourney.toNumber(), timeOfJourney.toNumber());
    assert.equal(updatedVehicleData.temperature.toNumber(), temperature.toNumber());
  });
});

it("Is initialized!", async () => 
  console.log("Your transaction signature", tx)
);