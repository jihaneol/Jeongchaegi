package com.oppas.dto;

import com.oppas.entity.Policy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.modelmapper.ModelMapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class PolicyDTO {
    private final Long id;
    private final int rnum;
    private final String bizId;
    private final String polyBizSjnm;
    private final String polyItcnCn;
    private final String sporCn;
    private final String sporScvl;
    private final String bizPrdCn;
    private final String prdRpttSecd;
    private final String rqutPrdCn;
    private final String ageInfo;
    private final String majrRqisCn;
    private final String empmSttsCn;
    private final String splzRlmRqisCn;
    private final String accrRqisCn;
    private final String prcpCn;
    private final String aditRscn;
    private final String prcpLmttTrgtCn;
    private final String rqutProcCn;
    private final String pstnPaprCn;
    private final String jdgnPresCn;
    private final String rqutUrla;
    private final String rfcSiteUrla1;
    private final String rfcSiteUrla2;
    private final String mngtMson;
    private final String mngtMrofCherCn;
    private final String cherCtpcCn;
    private final String cnsgNmor;
    private final String tintCherCn;
    private final String tintCherCtpcCn;
    private final String etct;
    private final String polyRlmCd;

    public Policy createPolicy(ModelMapper modelMapper) {
        Policy policy = modelMapper.map(this, Policy.class);

        // 신청 가능 날짜 파싱
        String dateRange = policy.getRqutPrdCn().replace(" " , "");
        String[] dates = dateRange.split("~");
        if (2 <= dates.length) {
            LocalDate beginDate = parseDate(dates[0]);
            LocalDate endDate = parseDate(dates[1]);
            policy.setRqutPrdBegin(beginDate);
            policy.setRqutPrdEnd(endDate);
        }

        // 신청 가능 연령 파싱
        int minAge = 0;
        int maxAge = 99;
        Pattern pattern = Pattern.compile("만\\s*(\\d+)세\\s*~\\s*(\\d+)세");
        Matcher matcher = pattern.matcher(policy.getAgeInfo());

        if (matcher.find()) {
            minAge = Integer.parseInt(matcher.group(1));
            maxAge = Integer.parseInt(matcher.group(2));
        }
        policy.setMinAge(minAge);
        policy.setMaxAge(maxAge);

        return policy;
    }

    // 날짜 파싱 함수
    public LocalDate parseDate(String dateString) {
        String[] formats = {
                "yyyy.MM.dd.",
                "yyyy.MM.dd",
                "yyyy.MM.d.",
                "yyyy.MM.d",
                "yyyy.M.dd.",
                "yyyy.M.dd",
                "yyyy.M.d.",
                "yyyy.M.d"
        };

        for (String format : formats) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(format);
                java.util.Date date = sdf.parse(dateString);
                return date.toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
            } catch (ParseException e) {
                // ignore
            }
        }
        return null;
    }

}
