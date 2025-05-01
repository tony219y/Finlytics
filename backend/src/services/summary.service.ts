import { prisma } from "../lib/prisma"

// * PercentChange
const calculatePercentChange = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0; // ป้องกันการหารด้วย 0
  return ((current - previous) / Math.abs(previous)) * 100;
};

// * formatCurrency
const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  });
  return formatter.format(amount);
};

export const getBalance = async (userId: number, id: number) => {

  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const currentIncome = await prisma.income.aggregate({
    where: {
      userId,
      date: {
        gte: currentMonthStart,
        lte: currentMonthEnd
      }
    },
    _sum: { amount: true }
  });

  const currentExpense = await prisma.expense.aggregate({
    where: {
      userId,
      date: {
        gte: currentMonthStart,
        lte: currentMonthEnd
      }
    },
    _sum: { amount: true }
  });
  const previousIncome = await prisma.income.aggregate({
    where: {
      userId,
      date: {
        gte: previousMonthStart,
        lte: previousMonthEnd
      }
    },
    _sum: { amount: true }
  });

  // ดึงข้อมูลรายจ่ายของเดือนก่อนหน้า
  const previousExpense = await prisma.expense.aggregate({
    where: {
      userId,
      date: {
        gte: previousMonthStart,
        lte: previousMonthEnd
      }
    },
    _sum: { amount: true }
  });


  // คำนวณยอดเงินสำหรับเดือนปัจจุบัน
  const currentTotalIncome = Number(currentIncome._sum.amount ?? 0);
  const currentTotalExpense = Number(currentExpense._sum.amount ?? 0);
  const currentBalance = currentTotalIncome - currentTotalExpense;

  // คำนวณยอดเงินสำหรับเดือนก่อนหน้า
  const previousTotalIncome = Number(previousIncome._sum.amount ?? 0);
  const previousTotalExpense = Number(previousExpense._sum.amount ?? 0);
  const previousBalance = previousTotalIncome - previousTotalExpense;

  // คำนวณเปอร์เซ็นต์การเปลี่ยนแปลง
  const balanceChange = calculatePercentChange(currentBalance, previousBalance);

  return {
    value: formatCurrency(currentBalance),
    raw: currentBalance,
    previous: formatCurrency(previousBalance),
    previousRaw: previousBalance,
    change: balanceChange.toFixed(1),
    isIncrease: balanceChange >= 0,
    updatedAt: new Date().toISOString()
  };
};


export const getIncome = async (userId: number, id: number) => {
  // สร้างวันที่เริ่มต้นและสิ้นสุดของเดือนปัจจุบัน
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // สร้างวันที่เริ่มต้นและสิ้นสุดของเดือนก่อนหน้า
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  // ดึงข้อมูลรายรับของเดือนปัจจุบัน
  const currentIncome = await prisma.income.aggregate({
    where: {
      userId,
      date: {
        gte: currentMonthStart,
        lte: currentMonthEnd
      }
    },
    _sum: { amount: true }
  });

  // ดึงข้อมูลรายรับของเดือนก่อนหน้า
  const previousIncome = await prisma.income.aggregate({
    where: {
      userId,
      date: {
        gte: previousMonthStart,
        lte: previousMonthEnd
      }
    },
    _sum: { amount: true }
  });

  // คำนวณยอดรวมรายรับ
  const currentTotalIncome = Number(currentIncome._sum.amount ?? 0);
  const previousTotalIncome = Number(previousIncome._sum.amount ?? 0);

  // คำนวณเปอร์เซ็นต์การเปลี่ยนแปลง
  const incomeChange = calculatePercentChange(currentTotalIncome, previousTotalIncome);

  // ดึงข้อมูลรายรับแยกตามแหล่งที่มา (สำหรับการวิเคราะห์เพิ่มเติม)
  const incomeBySource = await prisma.income.groupBy({
    by: ['source'],
    where: {
      userId,
      date: {
        gte: currentMonthStart,
        lte: currentMonthEnd
      }
    },
    _sum: {
      amount: true
    }
  });

  const sourceAnalysis = incomeBySource.map(item => ({
    source: item.source,
    amount: formatCurrency(Number(item._sum.amount)),
    percentage: ((Number(item._sum.amount) / currentTotalIncome) * 100).toFixed(1)
  }));

  return {
    value: formatCurrency(currentTotalIncome),
    raw: currentTotalIncome,
    previous: formatCurrency(previousTotalIncome),
    previousRaw: previousTotalIncome,
    change: incomeChange.toFixed(1),
    isIncrease: incomeChange >= 0,
    sources: sourceAnalysis,
    updatedAt: new Date().toISOString()
  };
}


export const getExpense = async (userId: number, id: number) => {
  // สร้างวันที่เริ่มต้นและสิ้นสุดของเดือนปัจจุบัน
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // สร้างวันที่เริ่มต้นและสิ้นสุดของเดือนก่อนหน้า
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  // ดึงข้อมูลรายจ่ายของเดือนปัจจุบัน
  const currentExpense = await prisma.expense.aggregate({
    where: {
      userId,
      date: {
        gte: currentMonthStart,
        lte: currentMonthEnd
      }
    },
    _sum: { amount: true }
  });

  // ดึงข้อมูลรายจ่ายของเดือนก่อนหน้า
  const previousExpense = await prisma.expense.aggregate({
    where: {
      userId,
      date: {
        gte: previousMonthStart,
        lte: previousMonthEnd
      }
    },
    _sum: { amount: true }
  });

  // คำนวณยอดรวมรายจ่าย
  const currentTotalExpense = Number(currentExpense._sum.amount ?? 0);
  const previousTotalExpense = Number(previousExpense._sum.amount ?? 0);

  // คำนวณเปอร์เซ็นต์การเปลี่ยนแปลง
  const expenseChange = calculatePercentChange(currentTotalExpense, previousTotalExpense);

  // ดึงข้อมูลรายจ่ายแยกตามหมวดหมู่
  const expenseByCategory = await prisma.expense.groupBy({
    by: ['category'],
    where: {
      userId,
      date: {
        gte: currentMonthStart,
        lte: currentMonthEnd
      }
    },
    _sum: {
      amount: true
    }
  });

  // ดึงข้อมูลงบประมาณของเดือนปัจจุบัน
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const budgets = await prisma.budget.findMany({
    where: {
      userId,
      month_year: currentMonth
    }
  });

  // สร้างข้อมูลการใช้จ่ายตามหมวดหมู่พร้อมงบประมาณ
  const categoryAnalysis = expenseByCategory.map(item => {
    const budget = budgets.find(b => b.category === item.category);
    const amount = Number(item._sum.amount);
    const limit = budget ? Number(budget.limit) : 0;
    const percentage = limit > 0 ? (amount / limit) * 100 : 0;

    return {
      category: item.category,
      amount: formatCurrency(amount),
      amountRaw: amount,
      percentage: ((amount / currentTotalExpense) * 100).toFixed(1),
      budget: budget ? formatCurrency(limit) : null,
      budgetRaw: limit,
      budgetPercentage: percentage.toFixed(1),
      isOverBudget: amount > limit && limit > 0
    };
  });

  return {
    value: formatCurrency(currentTotalExpense),
    raw: currentTotalExpense,
    previous: formatCurrency(previousTotalExpense),
    previousRaw: previousTotalExpense,
    change: expenseChange.toFixed(1),
    isIncrease: expenseChange >= 0,
    categories: categoryAnalysis,
    updatedAt: new Date().toISOString()
  };
}