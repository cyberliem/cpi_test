use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct PullString<'info> {
   ///CHECK: can be anything since we're not enforcing its type here
    #[account(mut)]
    pub puppet: AccountInfo<'info>,
    ///CHECK: this is a potential hack. To fix this you should enforce that its pubkey is the same as deployed puppet_program
    pub puppet_program: AccountInfo<'info>,
}
