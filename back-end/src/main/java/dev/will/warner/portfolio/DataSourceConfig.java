package dev.will.warner.portfolio;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        // Always use the repository-local `./data/portfolio.db` (assumed to exist)
        Path dbPath = Paths.get(System.getProperty("user.dir"), "data", "portfolio.db").toAbsolutePath();
        String url = "jdbc:sqlite:" + dbPath.toString();
        System.out.println("Using SQLite datasource URL: " + url);
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("org.sqlite.JDBC");
        ds.setUrl(url);
        return ds;
    }
}
