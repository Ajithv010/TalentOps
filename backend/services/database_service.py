import json
import os

import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# DATABASE CONNECTION
# =========================================================

def get_database_connection():
    """
    Create a PostgreSQL database connection using
    DATABASE_URL from the environment.
    """

    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        raise RuntimeError(
            "DATABASE_URL is not configured."
        )

    return psycopg.connect(
        database_url,
        row_factory=dict_row
    )


# =========================================================
# FIND CACHED ANALYSIS
# =========================================================

def get_cached_analysis(analysis_key):
    """
    Return an existing analysis from PostgreSQL.

    Returns:
        dict | None
    """

    with get_database_connection() as connection:

        with connection.cursor() as cursor:

            cursor.execute(
                """
                SELECT analysis_result
                FROM analysis_cache
                WHERE analysis_key = %s
                LIMIT 1
                """,
                (analysis_key,)
            )

            row = cursor.fetchone()

            if not row:
                return None

            return row["analysis_result"]


# =========================================================
# SAVE ANALYSIS
# =========================================================

def save_analysis(
    analysis_key,
    analysis_result
):
    """
    Save an analysis result to PostgreSQL.

    The analysis_key is UNIQUE, so the same analysis
    cannot be stored multiple times.
    """

    with get_database_connection() as connection:

        with connection.cursor() as cursor:

            cursor.execute(
                """
                INSERT INTO analysis_cache (
                    analysis_key,
                    analysis_result
                )
                VALUES (
                    %s,
                    %s::jsonb
                )
                ON CONFLICT (analysis_key)
                DO NOTHING
                """,
                (
                    analysis_key,
                    json.dumps(analysis_result)
                )
            )

        connection.commit()