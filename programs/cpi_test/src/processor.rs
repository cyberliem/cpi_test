use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    instruction::Instruction,
    program::invoke,
};
use crate::PullString;


pub(crate) fn pull_string(ctx: Context<PullString>, data: Vec<u8>) -> Result<()> {
    let ins = Instruction {
        program_id: ctx.program_id.key(),
        accounts: ctx.accounts.puppet.to_account_metas(None),
        data,
    };


    invoke(
        &ins,
        [ctx.accounts.puppet.to_account_info()].as_ref(),
    )?;

    Ok(())
}
