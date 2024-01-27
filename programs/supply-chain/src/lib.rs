use anchor_lang::prelude::*;

declare_id!("EHC3ajBT2mYQLGGNc1eJxNKhEY5b9mqbGoE2Mps8SE4J");

#[program]
mod supply_chain {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, plate: String, time_of_journey: u64, temperature: i32) -> Result<()> {
        let vehicle_data = &mut ctx.accounts.vehicle_data;
        vehicle_data.plate = plate;
        vehicle_data.time_of_journey = time_of_journey;
        vehicle_data.temperature = temperature;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 32 + 8 + 4)] 
    pub vehicle_data: Account<'info, VehicleData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct VehicleData {
    pub plate: String, 
    pub time_of_journey: u64,
    pub temperature: i32,
}

#[derive(Accounts)]
pub struct UpdateVehicleData<'info> {
    #[account(mut)]
    pub vehicle_data: Account<'info, VehicleData>,
    pub user: Signer<'info>,
}

impl<'info> UpdateVehicleData<'info> {
    pub fn update_data(
        ctx: Context<UpdateVehicleData>,
        plate: String,
        time_of_journey: u64,
        temperature: i32,
    ) -> Result<()> {
        let vehicle_data = &mut ctx.accounts.vehicle_data;
        vehicle_data.plate = plate;
        vehicle_data.time_of_journey = time_of_journey;
        vehicle_data.temperature = temperature;
        Ok(())
    }
}
