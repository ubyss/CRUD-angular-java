package io.github.ds.planeja;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "spring.datasource.url=jdbc:h2:mem:planeja-test")
class PlanejaApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
