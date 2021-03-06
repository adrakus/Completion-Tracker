"""empty message

Revision ID: 12392107c773
Revises: 
Create Date: 2022-03-21 17:21:49.635906

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12392107c773'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('steam_id', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('created_on', sa.DateTime(), nullable=True),
    sa.Column('modified_on', sa.DateTime(), nullable=True),
    sa.Column('token', sa.String(), nullable=True),
    sa.Column('token_exp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('steam_id')
    )
    op.create_index(op.f('ix_user_token'), 'user', ['token'], unique=True)
    op.create_table('game',
    sa.Column('app_id', sa.Integer(), nullable=False),
    sa.Column('main_complete', sa.Boolean(), nullable=True),
    sa.Column('dlc_complete', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('app_id', 'user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('game')
    op.drop_index(op.f('ix_user_token'), table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###
