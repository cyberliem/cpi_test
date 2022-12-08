pub mod instructions;
pub mod processor;

use anchor_lang::prelude::*;
declare_id!("53vvFBtavFcH4RmsTfMrxDTom9t6mWwdw9gLppFNJChC");

use crate::instructions::*;

#[program]
pub mod cpi_test {
    use super::*;

    pub fn pull_string(ctx: Context<PullString>, data: Vec<u8>) -> Result<()> {
        processor::pull_string(ctx, data)
    }
}
