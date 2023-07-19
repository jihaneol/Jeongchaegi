package com.oppas.batch;

import com.oppas.dto.PolicyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.xml.StaxEventItemReader;
import org.springframework.batch.item.xml.builder.StaxEventItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.UrlResource;
import org.springframework.oxm.xstream.XStreamMarshaller;

import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;

/*
--job.name=xmlBatchJob
 */
@Configuration
@RequiredArgsConstructor
public class XMLConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    @Bean
    public Job xmlBatchJob() {
        return jobBuilderFactory.get("xmlBatchJob")
                .incrementer(new RunIdIncrementer())
                .start(xmlBatchStep1())
                .build();
    }

    @Bean
    public Step xmlBatchStep1() {
        return stepBuilderFactory.get("xmlBatchStep1")
                .<PolicyDTO, PolicyDTO>chunk(10)
                .reader(xmlItemReader())
                .writer(xmlItemWriter())
                .build();
    }

    @Bean
    public StaxEventItemReader<PolicyDTO> xmlItemReader() {
        try {
            return new StaxEventItemReaderBuilder<PolicyDTO>()
                    .name("xmlItemReader")
                    .resource(new UrlResource("https://www.youthcenter.go.kr/opi/youthPlcyList.do?openApiVlak=839cda72655c1032eea8f071&display=10&pageIndex=1"))
                    .addFragmentRootElements("youthPolicy")
                    .unmarshaller(itemMarshaller())
                    .build();
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    @Bean
    public ItemWriter<PolicyDTO> xmlItemWriter() {
        return items -> {
            for (PolicyDTO item : items) {
                System.out.println(item.toString());
            }
        };
    }

    @Bean
    public XStreamMarshaller itemMarshaller() {
        Map<String, Class<?>> aliases = new HashMap<>();

        aliases.put("youthPolicy", PolicyDTO.class);

        XStreamMarshaller xStreamMarshaller = new XStreamMarshaller();
        xStreamMarshaller.setAliases(aliases);

        return xStreamMarshaller;
    }

}