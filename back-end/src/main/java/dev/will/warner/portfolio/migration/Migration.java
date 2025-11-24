package dev.will.warner.portfolio.migration;

import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.DataAccessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.annotation.PostConstruct;

import java.util.List;
import java.util.Map;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class Migration {

    private final JdbcTemplate jdbc;
    private final Logger log = LoggerFactory.getLogger(Migration.class);

    public Migration(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @PostConstruct
    public void migrate() {
        try {
            dropIpColumnIfExists();
        } catch (Exception e) {
            log.error("Error while attempting to remove `ip` column on startup", e);
        }
    }

    public void dropIpColumnIfExists() {
        List<Map<String, Object>> cols = jdbc.queryForList("PRAGMA table_info('visits')");

        boolean hasIp = cols.stream().anyMatch(m -> {
            Object name = m.get("name");
            return name != null && "ip".equalsIgnoreCase(name.toString());
        });

        if (!hasIp) {
            log.info("`ip` column not present on `visits` table; nothing to do.");
            return;
        }

        log.info("`ip` column found on `visits` table; attempting to drop it.");

        // Try the simple ALTER TABLE ... DROP COLUMN first
        try {
            jdbc.execute("ALTER TABLE visits DROP COLUMN ip");
            log.info("Dropped `ip` column using ALTER TABLE DROP COLUMN.");
            return;
        } catch (DataAccessException e) {
            log.warn("ALTER TABLE DROP COLUMN failed (might be unsupported). Falling back to table rebuild.", e);
        }

        // Fallback: rebuild the table without the `ip` column (SQLite-compatible)
    //     try {
    //         jdbc.execute((Connection conn) -> {
    //             try (Statement s = conn.createStatement()) {
    //                 conn.setAutoCommit(false);

    //                 s.execute("CREATE TABLE IF NOT EXISTS visits_new (id INTEGER PRIMARY KEY AUTOINCREMENT, visited_at DATETIME DEFAULT CURRENT_TIMESTAMP)");
    //                 s.execute("INSERT INTO visits_new (id, visited_at) SELECT id, visited_at FROM visits");
    //                 s.execute("DROP TABLE visits");
    //                 s.execute("ALTER TABLE visits_new RENAME TO visits");

    //                 conn.commit();
    //             } catch (SQLException ex) {
    //                 try { conn.rollback(); } catch (SQLException ex2) { /* ignore */ }
    //                 throw ex;
    //             }
    //             return null;
    //         });

    //         log.info("Rebuilt `visits` table without `ip` column.");
    //     } catch (DataAccessException dae) {
    //         log.error("Failed to remove `ip` column from `visits` table.", dae);
    //         throw dae;
    //     }
    }
}
