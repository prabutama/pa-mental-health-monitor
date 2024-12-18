"""migrations

Revision ID: b77f2109de87
Revises: ce1a0b3eee61
Create Date: 2024-10-21 09:00:21.350928

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b77f2109de87'
down_revision = 'ce1a0b3eee61'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mental_health_input', schema=None) as batch_op:
        batch_op.alter_column('systolic',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=7),
               existing_nullable=False)
        batch_op.alter_column('diastolic',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=7),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mental_health_input', schema=None) as batch_op:
        batch_op.alter_column('diastolic',
               existing_type=sa.Float(precision=7),
               type_=sa.REAL(),
               existing_nullable=False)
        batch_op.alter_column('systolic',
               existing_type=sa.Float(precision=7),
               type_=sa.REAL(),
               existing_nullable=False)

    # ### end Alembic commands ###
