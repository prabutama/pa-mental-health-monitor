"""New Migrate

Revision ID: ce1a0b3eee61
Revises: 
Create Date: 2024-10-15 12:40:36.621437

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'ce1a0b3eee61'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('gender', postgresql.ENUM('male', 'female', name='gender'), nullable=False),
    sa.Column('role', postgresql.ENUM('user', 'admin', name='role'), nullable=False),
    sa.Column('occupation', sa.String(length=100), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)

    op.create_table('mental_health_input',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('user_id', sa.String(length=36), nullable=False),
    sa.Column('skin_tension', sa.Float(), nullable=False),
    sa.Column('body_temperature', sa.Float(), nullable=False),
    sa.Column('heart_rate', sa.Float(), nullable=False),
    sa.Column('systolic', sa.Float(precision=7), nullable=False),
    sa.Column('diastolic', sa.Float(precision=7), nullable=False),
    sa.Column('sleep_time', sa.Float(), nullable=False),
    sa.Column('activities', sa.String(length=50), nullable=True),
    sa.Column('activity_category', sa.String(length=20), nullable=True),
    sa.Column('mood', sa.String(length=50), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mental_health_classification',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('input_id', sa.String(length=36), nullable=False),
    sa.Column('mental_condition', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['input_id'], ['mental_health_input.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('mental_health_classification')
    op.drop_table('mental_health_input')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_email'))

    op.drop_table('user')
    # ### end Alembic commands ###
