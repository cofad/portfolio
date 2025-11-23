package dev.will.warner.portfolio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.sql.PreparedStatement;
import java.sql.Statement;

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

@RestController
public class VisitController {

    private final JdbcTemplate jdbc;

    public VisitController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @PostMapping("/visit")
    public Map<String, Object> createVisit(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbc.update(conn -> {
            PreparedStatement ps = conn.prepareStatement("INSERT INTO visits(ip) VALUES(?)", Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, ip);
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key == null) {
            throw new IllegalStateException("Failed to obtain generated key for visit");
        }
        Long id = key.longValue();
        Map<String, Object> row = jdbc.queryForMap("SELECT id, ip, visited_at FROM visits WHERE id = ?", id);
        return row;
    }

    @GetMapping("/visits")
    public List<Map<String, Object>> listVisits() {
        return jdbc.queryForList("SELECT id, ip, visited_at FROM visits ORDER BY visited_at DESC LIMIT 100");
    }
}
